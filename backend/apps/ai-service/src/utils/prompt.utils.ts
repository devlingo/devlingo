import { RequestPromptParams } from 'ai-service/api/prompt-service/prompt.service';
import { createHash } from 'crypto';
import { ConversationChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BufferMemory } from 'langchain/memory';
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	SystemMessagePromptTemplate,
} from 'langchain/prompts';
import { RedisChatMessageHistory } from 'langchain/stores/message/redis';
import { ONE_HOUR_IN_SECONDS } from 'shared/constants';

/*
NOTE: this is solution cannot be used in a real production environment for long because it can lead
to memory overflow - depending on traffic.

We will need to revisit this strategy in the long run, perhaps simply by switching to using LRU caching.

TODO: implement LRU or rework the caching solution below in some other way.
 */
const memorySessions = new Map<string, BufferMemory>();
const openAIModels = new Map<string, ChatOpenAI>();
const openAIChains = new Map<string, ConversationChain>();

interface SessionMemoryParams {
	redisConnectionString: string;
	sessionId: string;
}

export function getOrCreateSessionMemory({
	redisConnectionString,
	sessionId,
}: SessionMemoryParams) {
	if (!memorySessions.has(sessionId)) {
		memorySessions.set(
			sessionId,
			new BufferMemory({
				chatHistory: new RedisChatMessageHistory({
					sessionId,
					sessionTTL: ONE_HOUR_IN_SECONDS,
					config: { url: redisConnectionString },
				}),
				returnMessages: true,
			}),
		);
	}

	return memorySessions.get(sessionId)!;
}

interface OpenAIModelParams {
	modelName?: string;
	openAIApiKey: string;
}

export function getOpenAIModel({
	modelName = 'gpt-3.5-turbo',
	openAIApiKey,
}: OpenAIModelParams): ChatOpenAI {
	if (!openAIModels.has(modelName)) {
		openAIModels.set(
			modelName,
			new ChatOpenAI({
				modelName,
				temperature: 0,
				openAIApiKey,
			}),
		);
	}

	return openAIModels.get(modelName)!;
}

export function getOpenAIChain({
	modelName,
	openAIApiKey,
	redisConnectionString,
	designId,
	nodeTypes,
	edgeTypes,
	projectId,
}: Pick<SessionMemoryParams, 'redisConnectionString'> &
	OpenAIModelParams &
	Omit<RequestPromptParams, 'designData' | 'promptContent'>) {
	const stringifiedNodeTypes = nodeTypes.join(',');
	const stringifiedEdgeTypes = edgeTypes.join(',');

	const sessionId = createHash('md5')
		.update(
			`${projectId}-${designId}-${stringifiedNodeTypes}-${stringifiedEdgeTypes}`,
		)
		.digest('hex');

	if (!openAIChains.has(sessionId)) {
		const llm = getOpenAIModel({ modelName, openAIApiKey });
		const memory = getOrCreateSessionMemory({
			redisConnectionString,
			sessionId,
		});
		const prompt = ChatPromptTemplate.fromPromptMessages([
			SystemMessagePromptTemplate.fromTemplate(
				`You are a helpful system architecture design assistant. 
				The design system uses json nodes and connection edges. 
				The node types available for use are ${stringifiedNodeTypes}. The edge types available for use are ${stringifiedEdgeTypes}.`,
			),
			HumanMessagePromptTemplate.fromTemplate('{input}'),
			SystemMessagePromptTemplate.fromTemplate(
				`Please answer the prompt made by the user with one paragraph explaining the proposed changes and the 
				reasoning for them, and a second paragraph that includes only the JSON result.  
				When proposing changes, make sure to keep the format similar to the JSON object provided by the user.`,
			),
		]);

		openAIChains.set(
			sessionId,
			new ConversationChain({ llm, memory, prompt }),
		);
	}

	return openAIChains.get(sessionId)!;
}
