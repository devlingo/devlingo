import { Commands } from '@/api/prompt/constants';
import { DesignData, NodeData } from '@/api/prompt/types';

export function executeCommands(
	designData: DesignData,
	edgeTypes: string[],
	nodeTypes: string[],
	commandsString: string,
): DesignData {
	const newDesign = structuredClone(designData);
	const commandBlocks: string[][] = ParseCommands(commandsString);

	for (const block of commandBlocks) {
		switch (block[0]) {
			case Commands.ADD_NODE:
				addNode(nodeTypes, block, newDesign);
				break;
			case Commands.REMOVE_NODE:
				removeNode(newDesign, block);
				break;
			case 'U_N':
			case Commands.UPDATE_NODE:
				updateNode(newDesign, block);
				break;
			case Commands.ADD_EDGE:
				addEdge(edgeTypes, block, newDesign);
				break;
			case Commands.REMOVE_EDGE:
				removeEdge(newDesign, block);
				break;
			case Commands.UPDATE_EDGE:
				updateEdge(newDesign, block);
				break;
			default:
				throw new Error(`Unknown command: ${block[0]}`);
		}
	}
	return newDesign;
}

function ParseCommands(commandsString: string): string[][] {
	const words: string[] = commandsString
		.replace(/\n/g, ' ')
		.split(' ')
		.map((word: string) => word.trim())
		.filter(Boolean);

	return words
		.slice(
			words.findIndex((word: string) =>
				Object.values(Commands).includes(word as Commands),
			),
		)
		.reduce((acc: string[][], word: string) => {
			if (Object.values(Commands).includes(word as Commands)) {
				acc.push([word]);
			} else {
				acc[acc.length - 1].push(word);
			}
			return acc;
		}, []);
}

function createNode(
	id: string,
	nodeType: string,
	nodeName: string,
	x: string,
	y: string,
) {
	// Validate node type

	return {
		data: {
			nodeType,
			formData: {
				nodeName,
			},
		},
		id,
		position: {
			x: Number(x),
			y: Number(y),
		},
		type: nodeType,
	};
}

function addNode(nodeTypes: string[], block: string[], newDesign: DesignData) {
	if (!nodeTypes.includes(block[2])) {
		throw new Error(
			`Invalid node type: ${block[2]} at command ${block.toString()}`,
		);
	}
	newDesign.nodes.push(
		createNode(block[1], block[2], block[3], block[4], block[5]),
	);
}

function removeNode(newDesign: DesignData, block: string[]) {
	const index = newDesign.nodes.findIndex((item) => item.id === block[1]);
	if (index === -1) {
		throw new Error(
			`Item with id ${
				block[1]
			} not found, at command ${block.toString()}`,
		);
	}
	newDesign.nodes.splice(index, 1);
}

function updateNode(newDesign: DesignData, block: string[]) {
	const node = newDesign.nodes.find((node: NodeData) => node.id === block[1]);
	if (!node) {
		throw new Error(`Node with id ${block[1]} not found`);
	}
	for (let i = 2; i < block.length; i += 2) {
		const prop = block[i];
		const val = block[i + 1];
		(node as Record<string, any>)[prop] = val;
	}
}

function addEdge(edgeTypes: string[], block: string[], newDesign: DesignData) {
	if (!edgeTypes.includes(block[4])) {
		throw new Error(
			`Invalid edge type: ${block[4]}, at command ${block.toString()}`,
		);
	}
	newDesign.edges.push({
		id: block[1],
		source: block[2],
		target: block[3],
		type: block[4],
	});
}

function removeEdge(newDesign: DesignData, block: string[]) {
	const indexEdge = newDesign.edges.findIndex((item) => item.id === block[1]);
	if (indexEdge === -1) {
		throw new Error(
			`Item with id ${
				block[1]
			} not found, at command ${block.toString()}`,
		);
	}
}

function updateEdge(newDesign: DesignData, block: string[]) {
	const edge = newDesign.edges.find((edge) => edge.id === block[1]);
	if (!edge) {
		throw new Error(`Edge with id ${block[1]} not found`);
	}
	for (let i = 2; i < block.length; i += 2) {
		const prop = block[i];
		const val = block[i + 1];
		(edge as Record<string, any>)[prop] = val;
	}
}
