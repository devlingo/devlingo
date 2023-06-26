import { DesignData, NodeData } from '@/api/prompt/types';

export class DSLService {
	commands = ['A_N', 'R_N', 'U_N', 'A_E', 'R_E', 'U_E'];
	design: DesignData;
	edgeTypes: string[];
	nodeTypes: string[];

	constructor(
		designData: DesignData,
		edgeTypes: string[],
		nodeTypes: string[],
	) {
		this.design = designData;
		this.edgeTypes = edgeTypes;
		this.nodeTypes = nodeTypes;
	}

	executeCommands(commandsString: string) {
		// Split the string into words
		const words = commandsString.split(' ');

		// Collect commands with their arguments
		const commandsWithArgs: string[][] = [];
		let currentCommand: string[] = [];
		for (const word of words) {
			if (this.isCommand(word)) {
				if (currentCommand.length > 0) {
					commandsWithArgs.push(currentCommand);
				}
				currentCommand = [word];
			} else {
				if (currentCommand.length > 0) {
					currentCommand.push(word);
				}
			}
		}
		if (currentCommand.length > 0) {
			commandsWithArgs.push(currentCommand);
		}
		// Execute each command with its arguments
		for (const commandWithArgs of commandsWithArgs) {
			this.executeCommand(commandWithArgs);
		}
	}

	private executeCommand(commandWithArgs: string[]) {
		// The first word should be the command name
		const cmd = commandWithArgs[0];

		// The rest are the arguments to the command
		const args = commandWithArgs.slice(1);

		// Execute the appropriate function based on the command name
		switch (cmd) {
			case 'A_N':
				this.addNode(args);
				break;
			case 'R_N':
				this.removeNode(args);
				break;
			case 'U_N':
				this.updateNode(args);
				break;
			case 'A_E':
				this.addEdge(args);
				break;
			case 'R_E':
				this.removeEdge(args);
				break;
			case 'U_E':
				this.updateEdge(args);
				break;
			default:
				throw new Error(`Unknown command: ${cmd}`);
		}
	}

	private isCommand(word: string): boolean {
		return this.commands.includes(word);
	}

	// Add Node operation
	private addNode(args: string[]) {
		const [id, nodeType, nodeName, x, y] = args;

		// Validate node type
		if (!this.nodeTypes.includes(nodeType)) {
			throw new Error(`Invalid node type: ${nodeType}`);
		}

		// Create a new node
		const newNode = {
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

		// Add the new node to the design
		this.design.nodes.push(newNode);
	}

	// Remove Node operation
	private removeNode(args: string[]) {
		const [id] = args;

		// Find and remove node with given id
		this.findAndRemove(id, this.design.nodes);
	}

	// Update Node operation
	private updateNode(args: string[]) {
		const [id, ...propValPairs] = args;
		// Find the node to be updated
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const node = this.design.nodes.find((node: NodeData) => node.id === id);
		if (!node) {
			throw new Error(`Node with id ${id} not found`);
		}
		// Update properties
		this.updateProperties(
			node,
			propValPairs,
			['t', 'n', 'x', 'y'],
			this.nodeTypes,
		);
	}

	// Add Edge operation
	private addEdge(args: string[]) {
		const [id, source, target, edgeType] = args;
		// Validate edge type
		if (!this.edgeTypes.includes(edgeType)) {
			throw new Error(`Invalid edge type: ${edgeType}`);
		}
		// Create a new edge
		const newEdge = {
			id,
			source,
			target,
			type: edgeType,
		};
		// Add the new edge to the design
		this.design.edges.push(newEdge);
	}

	// Remove Edge operation
	private removeEdge(args: string[]) {
		const [id] = args;
		// Find and remove edge with given id
		this.findAndRemove(id, this.design.edges);
	}

	// Update Edge operation
	private updateEdge(args: string[]) {
		const [id, ...propValPairs] = args;
		// Find the edge to be updated
		const edge = this.design.edges.find((edge) => edge.id === id);
		if (!edge) {
			throw new Error(`Edge with id ${id} not found`);
		}
		// Update properties
		this.updateProperties(
			edge,
			propValPairs,
			['s', 't', 'ty'],
			this.edgeTypes,
		);
	}

	// Helper function to update properties on an object from a list of property-value pairs
	private updateProperties(
		object: any,
		propValPairs: string[],
		validProps: string[],
		types: string[],
	) {
		for (let i = 0; i < propValPairs.length; i += 2) {
			const prop = propValPairs[i];
			const val = propValPairs[i + 1];
			if (!validProps.includes(prop)) {
				throw new Error(`Unknown property: ${prop}`);
			}
			if ((prop === 't' || prop === 'ty') && !types.includes(val)) {
				throw new Error(`Invalid type: ${val}`);
			}
			if (prop === 'x' || prop === 'y') {
				// eslint-disable-next-line no-param-reassign,@typescript-eslint/no-unsafe-member-access
				object[prop] = Number(val);
			} else {
				// eslint-disable-next-line no-param-reassign,@typescript-eslint/no-unsafe-member-access
				object[prop] = val;
			}
		}
	}

	// Helper function to find an item by id in an array and remove it
	private findAndRemove(id: string, array: any[]) {
		const index = array.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new Error(`Item with id ${id} not found`);
		}
		array.splice(index, 1);
	}
}
