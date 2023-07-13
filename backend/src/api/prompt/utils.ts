import { EdgeType, ServiceType, SystemComponentType } from 'shared/constants';
import { DesignData, EdgeData } from 'shared/types';
import { createNode } from 'shared/utils';

import { PromptCommand } from '@/api/prompt/constants';

export interface FlatNode {
	id: string;
	nodeType: ServiceType | SystemComponentType;
	nodeName: string;
	xPos: number;
	yPos: number;
}

export type PromptDesignInterface = Pick<DesignData, 'edges'> & {
	nodes: FlatNode[];
};

export function mapDesignDataToPromptInterface({
	nodes,
	edges,
}: DesignData): PromptDesignInterface {
	return {
		nodes: nodes.map(
			({
				id,
				data: {
					nodeType,
					formData: { nodeName },
				},
				position: { x: xPos, y: yPos },
			}) => ({
				id,
				nodeType,
				nodeName,
				xPos,
				yPos,
			}),
		),
		edges,
	};
}

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

	if (currentCommand) {
		commands.push([currentCommand, [...parameters]]);
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

	const node = createNode({
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
	});

	designData.nodes.push(node);
}

export function removeNode([id]: string[], designData: DesignData) {
	const index = designData.nodes.findIndex((node) => node.id === id);
	if (index === -1) {
		throw new Error(`Node with id ${id} not found`);
	}
	designData.nodes.splice(index, 1);
	designData.edges = designData.edges.filter(
		(e) => e.source !== id && e.target !== id,
	);
}

export function updateNode([id, ...props]: string[], designData: DesignData) {
	const index = designData.nodes.findIndex((node) => node.id === id);
	if (index === -1) {
		throw new Error(`Node with id ${id} not found`);
	}

	const nodeData = designData.nodes[index];

	for (let i = 0; i < props.length; i += 2) {
		const key = props[i] as keyof FlatNode;
		const value = props[i + 1];
		switch (key) {
			case 'xPos':
				nodeData.position.x = parseInt(value);
				break;
			case 'yPos':
				nodeData.position.y = parseInt(value);
				break;
			case 'nodeType':
				nodeData.data.nodeType = value as
					| ServiceType
					| SystemComponentType;
				break;
			case 'nodeName':
				nodeData.data.formData.nodeName = value;
				break;
			default:
				throw new Error(`Invalid node property: ${key}`);
		}
	}
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
	const edgeData = designData.edges[index];

	for (let i = 0; i < props.length; i += 2) {
		const key = props[i] as keyof EdgeData;
		Reflect.set(edgeData, key, props[i + 1]);
	}
}
