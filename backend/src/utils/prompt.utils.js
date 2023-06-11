'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.cleanResponse =
	exports.getOrCreateOpenAIChain =
	exports.createOpenAIChain =
	exports.getOpenAIModel =
		void 0;
const crypto_1 = require('crypto');
const chains_1 = require('langchain/chains');
const openai_1 = require('langchain/chat_models/openai');
const memory_1 = require('langchain/memory');
const prompts_1 = require('langchain/prompts');
const redis_1 = require('langchain/stores/message/redis');
const constants_1 = require('../constants');
/*
NOTE: this is solution cannot be used in a real production environment for long because it can lead
to memory overflow - depending on traffic.

We will need to revisit this strategy in the long run, perhaps simply by switching to using LRU caching.

TODO: implement LRU or rework the caching solution below in some other way.
 */
const openAIModels = new Map();
const openAIChains = new Map();
function getOpenAIModel({ modelName, openAIApiKey }) {
	if (!openAIModels.has(modelName)) {
		openAIModels.set(
			modelName,
			new openai_1.ChatOpenAI({
				modelName,
				temperature: 0,
				openAIApiKey,
			}),
		);
	}
	return openAIModels.get(modelName);
}
exports.getOpenAIModel = getOpenAIModel;
function createOpenAIChain({
	modelName,
	openAIApiKey,
	sessionId,
	redisConnectionString,
	nodeTypes,
	edgeTypes,
}) {
	const llm = getOpenAIModel({ modelName, openAIApiKey });
	const memory = new memory_1.BufferMemory({
		chatHistory: new redis_1.RedisChatMessageHistory({
			sessionId,
			sessionTTL: constants_1.ONE_HOUR_IN_SECONDS,
			config: { url: redisConnectionString },
		}),
		returnMessages: true,
		memoryKey: 'history',
	});
	// NOTE: SystemMessagePromptTemplate should not be more than 2 lines each.
	const prompt = prompts_1.ChatPromptTemplate.fromPromptMessages([
		prompts_1.SystemMessagePromptTemplate
			.fromTemplate(`You are a system architecture design assistant working with JSON nodes and connection edges. 
			The available node types are: ${nodeTypes}. The available edge types are: ${edgeTypes}.`),
		prompts_1.SystemMessagePromptTemplate
			.fromTemplate(`Nodes are positioned on a 2D plane with X and Y coordinates. Each node has a fixed width of 250 pixels and 
			height of 120 pixels`),
		prompts_1.SystemMessagePromptTemplate
			.fromTemplate(`When adding new nodes, try to position them to not
			intersect existing edges and keep a minimal distance of 50 pixels from other nodes.`),
		prompts_1.SystemMessagePromptTemplate.fromTemplate(
			`Use unique UUID version 4 values when generating ids.`,
		),
		prompts_1.SystemMessagePromptTemplate
			.fromTemplate(`Provide a paragraph explaining the proposed changes and 
		the reasoning behind them, and a second paragraph containing only the JSON result. Ensure that any additions maintain the 
			format of the JSON object provided by the user, and do not modify the provided data unless requested to do so.`),
		new prompts_1.MessagesPlaceholder('history'),
		prompts_1.HumanMessagePromptTemplate.fromTemplate('{input}'),
	]);
	return new chains_1.ConversationChain({ llm, memory, prompt });
}
exports.createOpenAIChain = createOpenAIChain;
function getOrCreateOpenAIChain({
	modelName,
	designId,
	nodeTypes,
	edgeTypes,
	projectId,
	...rest
}) {
	const stringifiedNodeTypes = nodeTypes.join(',');
	const stringifiedEdgeTypes = edgeTypes.join(',');
	const sessionId = (0, crypto_1.createHash)('md5')
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
	return openAIChains.get(sessionId);
}
exports.getOrCreateOpenAIChain = getOrCreateOpenAIChain;
function cleanResponse(response) {
	const answer = response.slice(0, response.indexOf('\n\n')).trim();
	const design = JSON.parse(
		response.slice(response.indexOf('{'), response.lastIndexOf('}') + 1),
	);
	return { answer, design };
}
exports.cleanResponse = cleanResponse;
//# sourceMappingURL=prompt.utils.js.map
