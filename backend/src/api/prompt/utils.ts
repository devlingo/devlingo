import { deepmerge } from 'deepmerge-ts';
import { EdgeType, ServiceType } from 'shared/constants';
import { DesignData, EdgeData, NodeData } from 'shared/types';
import { createNode } from 'shared/utils';

import { PromptCommand } from '@/api/prompt/constants';

export function parsePromptResponseIntoCommands(
	promptResponse: string,
): [command: PromptCommand, parameters: string[]][] {
	let words = promptResponse
		.replace(/\n/g, ' ')
		.split(' ')
		.map((word) => word.trim())
		.filter(Boolean);

	// we need to remove unnecessary verbiage returned by the prompt before commands are begun, if any.
	words = words.slice(
		words.findIndex((word: string) =>
			Object.values(PromptCommand).includes(word as PromptCommand),
		),
	);

	const commands: [command: PromptCommand, parameters: string[]][] = [];

	let currentCommand: PromptCommand | null = null;
	let parameters: string[] = [];

	for (const word of words) {
		if (Object.values(PromptCommand).includes(word as PromptCommand)) {
			if (currentCommand) {
				commands.push([currentCommand, [...parameters]]);
				parameters = [];
			}
			currentCommand = word as PromptCommand;
		} else {
			parameters.push(word);
		}
	}

	return commands;
}

export function addNode(
	[id, nodeType, nodeName, xPos, yPos]: string[],
	designData: DesignData,
) {
	if (
		!Object.values(ServiceType).includes(nodeType as unknown as ServiceType)
	) {
		throw new Error(`Invalid node type: ${nodeType}`);
	}
	designData.nodes.push(
		createNode({
			id,
			data: {
				nodeType: nodeType as ServiceType,
				formData: {
					nodeName,
				},
			},
			position: {
				x: parseInt(xPos),
				y: parseInt(yPos),
			},
		}),
	);
}

export function removeNode([id]: string[], designData: DesignData) {
	const index = designData.nodes.findIndex((node) => node.id === id);
	if (index === -1) {
		throw new Error(`Node with id ${id} not found`);
	}
	designData.nodes.splice(index, 1);
}

export function updateNode([id, ...props]: string[], designData: DesignData) {
	const index = designData.nodes.findIndex((node) => node.id === id);
	if (index === -1) {
		throw new Error(`Node with id ${id} not found`);
	}

	const params: Record<string, any> = {};

	for (let i = 0; i < props.length; i += 2) {
		const key = props[i];
		params[key] = props[i + 1];
	}

	designData.nodes[index] = deepmerge(
		designData.nodes[index],
		params as NodeData,
	);
}

export function addEdge(
	[id, source, target, type]: string[],
	designData: DesignData,
) {
	if (!Object.values(EdgeType).includes(type as unknown as EdgeType)) {
		throw new Error(`Invalid edge type: ${type}`);
	}
	designData.edges.push({
		id,
		source,
		target,
		type,
	});
}

export function removeEdge([id]: string[], designData: DesignData) {
	const index = designData.edges.findIndex((edge) => edge.id === id);
	if (index === -1) {
		throw new Error(`Edge with id ${id} not found`);
	}
	designData.edges.splice(index, 1);
}

export function updateEdge([id, ...props]: string[], designData: DesignData) {
	const index = designData.edges.findIndex((edge) => edge.id === id);
	if (index === -1) {
		throw new Error(`Edge with id ${id} not found`);
	}
	const params: Record<string, any> = {};

	for (let i = 0; i < props.length; i += 2) {
		const key = props[i];
		params[key] = props[i + 1];
	}

	designData.edges[index] = deepmerge(
		designData.edges[index],
		params as EdgeData,
	);
}
