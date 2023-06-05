import { RequestPromptParams } from 'ai-service/api/prompt-service/prompt.service';
import { createHash } from 'crypto';
import { ConversationChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BufferMemory } from 'langchain/memory';
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	MessagesPlaceholder,
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
const openAIModels = new Map<string, ChatOpenAI>();
const openAIChains = new Map<string, ConversationChain>();

interface SessionMemoryParams {
	redisConnectionString: string;
	sessionId: string;
}

interface OpenAIModelParams {
	modelName: string;
	openAIApiKey: string;
}

export function getOpenAIModel({
	modelName,
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

export function createOpenAIChain({
	modelName,
	openAIApiKey,
	sessionId,
	redisConnectionString,
	nodeTypes,
	edgeTypes,
}: SessionMemoryParams &
	OpenAIModelParams & { nodeTypes: string; edgeTypes: string }) {
	const llm = getOpenAIModel({ modelName, openAIApiKey });

	const memory = new BufferMemory({
		chatHistory: new RedisChatMessageHistory({
			sessionId,
			sessionTTL: ONE_HOUR_IN_SECONDS,
			config: { url: redisConnectionString },
		}),
		returnMessages: true,
		memoryKey: 'history',
	});
	// NOTE: SystemMessagePromptTemplate should not be more than 2 lines each.
	const prompt = ChatPromptTemplate.fromPromptMessages([
		SystemMessagePromptTemplate.fromTemplate(
			`You are a system architecture design assistant working with JSON nodes and connection edges. 
			Choose from the following node types: ${nodeTypes}. The available edge types are: ${edgeTypes}.`,
		),
		SystemMessagePromptTemplate.fromTemplate(
			`Nodes are positioned on a 2D plane with X and Y coordinates. Each node has a fixed width of 250 pixels and 
			height of 120 pixels and has four connection handles (top, bottom, left and right).`,
		),
		SystemMessagePromptTemplate.fromTemplate(`When adding new nodes, try to position them to not
			intersect existing edges.`),
		SystemMessagePromptTemplate.fromTemplate(`When adding new nodes, do not overlap other nodes. Try to keep
		a distance of at least 50 pixels but no more than 500 pixels - if possible.`),
		SystemMessagePromptTemplate.fromTemplate(`When adding new edges, make sure to set the 'sourceHandle' and 
		'targetHandle' properties to a position, ensuring that the edge will be as short as possible.`),
		SystemMessagePromptTemplate.fromTemplate(
			`Note that multiple connections to the same handle are allowed.`,
		),
		SystemMessagePromptTemplate.fromTemplate(`Provide a concise paragraph explaining the proposed changes and 
		the reasoning behind them, and a second paragraph containing only the JSON result.`),
		SystemMessagePromptTemplate.fromTemplate(`Ensure that any additions maintain the 
			format of the JSON object provided by the user.`),
		SystemMessagePromptTemplate.fromTemplate(`Do not remove or modify any existing nodes or edges unless 
		requested to do so.`),
		SystemMessagePromptTemplate.fromTemplate(
			`Make sure to generate UUID version 4 values for ids.`,
		),
		new MessagesPlaceholder('history'),
		HumanMessagePromptTemplate.fromTemplate('{input}'),
	]);

	return new ConversationChain({ llm, memory, prompt });
}

export function getOrCreateOpenAIChain({
	modelName,
	designId,
	nodeTypes,
	edgeTypes,
	projectId,
	...rest
}: Pick<SessionMemoryParams, 'redisConnectionString'> &
	OpenAIModelParams &
	Omit<RequestPromptParams, 'designData' | 'promptContent'>) {
	const stringifiedNodeTypes = nodeTypes.join(',');
	const stringifiedEdgeTypes = edgeTypes.join(',');

	const sessionId = createHash('md5')
		.update(
			Object.values({
				designId,
				modelName,
				projectId,
				stringifiedEdgeTypes,
				stringifiedNodeTypes,
			}).join(':'),
		)
		.digest('hex');

	if (!openAIChains.has(sessionId)) {
		openAIChains.set(
			sessionId,
			createOpenAIChain({
				modelName,
				sessionId,
				nodeTypes: stringifiedNodeTypes,
				edgeTypes: stringifiedEdgeTypes,
				...rest,
			}),
		);
	}

	return openAIChains.get(sessionId)!;
}

export function cleanResponse(response: string): {
	answer: string;
	design: Record<string, any>;
} {
	const answer = response.slice(0, response.indexOf('\n\n')).trim();
	const design = JSON.parse(
		response.slice(response.indexOf('{'), response.lastIndexOf('}') + 1),
	) as Record<string, any>;
	return { answer, design };
}
