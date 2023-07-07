import {
	addEdge,
	addNode,
	parsePromptResponseIntoCommands,
	removeEdge,
	removeNode,
	updateEdge,
	updateNode,
} from '@/api/prompt/utils';
import { ServiceType } from 'shared/constants';
import { EdgeFactory, NodeFactory } from 'shared/testing';
import { DesignData } from 'shared/types';
import { beforeEach, expect } from 'vitest';

describe('Prompt Util Tests', () => {
	let designData: DesignData;

	beforeEach(async () => {
		const nodes = await NodeFactory.batch(4);
		const edges = (await EdgeFactory.batch(2)).map((e, i) => {
			e.source = nodes[i].id;
			e.target = nodes[i + 2].id;
			return e;
		});

		designData = { nodes, edges };
	});

	describe('parsePromptResponseIntoCommands tests', () => {
		it('parses an a single command', () => {
			const commandString = 'A_N db1 DynamoDB Database 200 200';
			expect(parsePromptResponseIntoCommands(commandString)).toEqual([
				['A_N', ['db1', 'DynamoDB', 'Database', '200', '200']],
			]);
		});
		it('parses multiple commands', () => {
			const commandString =
				'A_N 5a6c3b5a-9c3a-4687-8199-c2ba25f480a2 MongoDB Database 700 500 A_E 9f4c2e95-d916-4a5d-9afc-caa405396d4c 5a6c3b5a-9c3a-4687-8199-c2ba25f480a2 54b111d0-9c3a-4687-8199-c2ba25f480a2 default';
			expect(parsePromptResponseIntoCommands(commandString)).toEqual([
				[
					'A_N',
					[
						'5a6c3b5a-9c3a-4687-8199-c2ba25f480a2',
						'MongoDB',
						'Database',
						'700',
						'500',
					],
				],
				[
					'A_E',
					[
						'9f4c2e95-d916-4a5d-9afc-caa405396d4c',
						'5a6c3b5a-9c3a-4687-8199-c2ba25f480a2',
						'54b111d0-9c3a-4687-8199-c2ba25f480a2',
						'default',
					],
				],
			]);
		});
		it('handles preliminary text', () => {
			const commandString =
				'this is text that should not effect the test A_N 5a6c3b5a-9c3a-4687-8199-c2ba25f480a2 MongoDB Database 700 500 A_E 9f4c2e95-d916-4a5d-9afc-caa405396d4c 5a6c3b5a-9c3a-4687-8199-c2ba25f480a2 54b111d0-9c3a-4687-8199-c2ba25f480a2 default';
			expect(parsePromptResponseIntoCommands(commandString)).toEqual([
				[
					'A_N',
					[
						'5a6c3b5a-9c3a-4687-8199-c2ba25f480a2',
						'MongoDB',
						'Database',
						'700',
						'500',
					],
				],
				[
					'A_E',
					[
						'9f4c2e95-d916-4a5d-9afc-caa405396d4c',
						'5a6c3b5a-9c3a-4687-8199-c2ba25f480a2',
						'54b111d0-9c3a-4687-8199-c2ba25f480a2',
						'default',
					],
				],
			]);
		});
		it('handles line breaks', () => {
			const commandString =
				'A_N 5a6c3b5a-9c3a-4687-8199-c2ba25f480a2 MongoDB Database 700 500\nA_E 9f4c2e95-d916-4a5d-9afc-caa405396d4c 5a6c3b5a-9c3a-4687-8199-c2ba25f480a2 54b111d0-9c3a-4687-8199-c2ba25f480a2 default';
			expect(parsePromptResponseIntoCommands(commandString)).toEqual([
				[
					'A_N',
					[
						'5a6c3b5a-9c3a-4687-8199-c2ba25f480a2',
						'MongoDB',
						'Database',
						'700',
						'500',
					],
				],
				[
					'A_E',
					[
						'9f4c2e95-d916-4a5d-9afc-caa405396d4c',
						'5a6c3b5a-9c3a-4687-8199-c2ba25f480a2',
						'54b111d0-9c3a-4687-8199-c2ba25f480a2',
						'default',
					],
				],
			]);
		});
	});

	describe('addNode tests', () => {
		it('adds a node', () => {
			const designDataNodesLength = designData.nodes.length;
			const input = ['1', ServiceType.NestJs, 'node1', '10', '20'];
			addNode(input, designData);
			expect(designData.nodes).toHaveLength(designDataNodesLength + 1);
			expect(designData.nodes[designDataNodesLength]).toEqual({
				data: {
					formData: {
						nodeName: 'node1',
					},
					nodeType: ServiceType.NestJs,
				},
				id: '1',
				position: {
					x: 10,
					y: 20,
				},
				type: 'CustomNode',
			});
		});

		it('throws an error on invalid nodeType', () => {
			const designData = { nodes: [], edges: [] };
			const input = ['1', 'invalid', 'node1', '10', '20'];
			expect(() => addNode(input, designData)).toThrow(
				'Invalid node type: invalid',
			);
		});
	});

	describe('removeNode tests', () => {
		it('removes a node', () => {
			const firstNode = designData.nodes[0];

			removeNode([firstNode.id], designData);
			expect(designData.nodes).toEqual(
				designData.nodes.filter((n) => n.id !== firstNode.id),
			);
		});

		it('removes any edges connected to the node', () => {
			const firstNode = designData.nodes[0];

			const edge = designData.edges.find(
				(e) => e.source === firstNode.id || e.target === firstNode.id,
			);
			expect(edge).toBeDefined();

			removeNode([firstNode.id], designData);
			expect(designData.nodes).toEqual(
				designData.nodes.filter((n) => n.id !== firstNode.id),
			);
			expect(designData.edges).toEqual(
				designData.edges.filter((e) => e.id !== edge!.id),
			);
		});

		it('throws an error when node index is not found', () => {
			expect(() => removeNode(['abc'], designData)).toThrowError(
				'Node with id abc not found',
			);
		});
	});

	describe('updateNode tests', () => {
		it('updates a node', () => {});

		it('does not modify the data if no properties are given', () => {});

		it('throws an error when node index is not found', () => {
			expect(() =>
				updateNode(
					['abc', 'data', 'formData', 'nodeName', 'Node 2'],
					designData,
				),
			).toThrow('Node with id abc not found');
		});
	});

	describe('addEdge tests', () => {
		it('adds an edge', () => {});

		it('throws an error on invalid edgeType', () => {
			const designData = { nodes: [], edges: [] };
			const edge = ['1', 'source', 'target', 'invalid_type'];
			expect(() => addEdge(edge, designData)).toThrow(
				'Invalid edge type: invalid_type',
			);
		});
	});

	describe('removeEdge tests', () => {
		it('removes an edge', () => {});

		it('throws an error when edge index is not found', () => {
			expect(() => removeEdge(['abc'], designData)).toThrow(
				`Edge with id abc not found`,
			);
		});
	});

	describe('updateEdge tests', () => {
		it('updates an edge', () => {});

		it('does not modify the data if no properties are given', () => {});

		it('throws an error when edge index is not found', () => {
			expect(() =>
				updateEdge(['2', 'label', 'Edge 1'], designData),
			).toThrowError('Edge with id 2 not found');
		});
	});
});
