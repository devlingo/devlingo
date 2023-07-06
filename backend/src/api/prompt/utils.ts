import { EdgeType, ServiceType } from 'shared/constants';
import { DesignData, NodeData } from 'shared/types';
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

export function executeAddNode(
	[id, nodeType, nodeName, xPos, yPos]: string[],
	newDesign: DesignData,
) {
	if (
		!Object.values(ServiceType).includes(nodeType as unknown as ServiceType)
	) {
		throw new Error(`Invalid node type: ${nodeType}`);
	}
	newDesign.nodes.push(
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

export function executeRemoveNode([id]: string[], newDesign: DesignData) {
	const index = newDesign.nodes.findIndex((item) => item.id === id);
	if (index === -1) {
		throw new Error(`Node with id ${id} not found`);
	}
	newDesign.nodes.splice(index, 1);
}

export function executeUpdateNode(
	[id, ...props]: string[],
	newDesign: DesignData,
) {
	const node = newDesign.nodes.find((node: NodeData) => node.id === id);
	if (!node) {
		throw new Error(`Node with id ${id} not found`);
	}
	for (let i = 0; i < props.length; i += 2) {
		const key = props[i];
		const value = props[i + 1];
		Reflect.set(node, key, value);
	}
}

export function executeAddEdge(
	[id, source, target, type]: string[],
	newDesign: DesignData,
) {
	if (!Object.values(EdgeType).includes(type as unknown as EdgeType)) {
		throw new Error(`Invalid edge type: ${type}`);
	}
	newDesign.edges.push({
		id,
		source,
		target,
		type,
	});
}

export function executeRemoveEdge([id]: string[], newDesign: DesignData) {
	const index = newDesign.edges.findIndex((item) => item.id === id);
	if (index === -1) {
		throw new Error(`Item with id ${id}`);
	}
	newDesign.edges.splice(index, 1);
}

export function executeUpdateEdge(
	[id, ...props]: string[],
	newDesign: DesignData,
) {
	const edge = newDesign.edges.find((edge) => edge.id === id);
	if (!edge) {
		throw new Error(`Edge with id ${id} not found`);
	}
	for (let i = 0; i < props.length; i += 2) {
		const key = props[i];
		const value = props[i + 1];
		Reflect.set(edge, key, value);
	}
}
