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
	sessionId,
}: SessionMemoryParams & OpenAIModelParams) {
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
				The node types available for use are {nodeOptions} and the edge types available for use are {edgeOptions}. 
				This is an example design {exampleData}. When proposing changes, make sure to keep the format similar to the 
				example and return only json.`,
			),
			SystemMessagePromptTemplate.fromTemplate(
				`This is the existing design {designData}, if the design is not empty, answer relative to it.`,
			),
			HumanMessagePromptTemplate.fromTemplate('{promptContent}'),
		]);

		openAIChains.set(
			sessionId,
			new ConversationChain({ llm, memory, prompt }),
		);
	}

	return openAIChains.get(sessionId)!;
}
