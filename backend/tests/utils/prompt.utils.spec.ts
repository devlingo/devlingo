import { EdgeType, NodeShape, ServiceType } from 'shared/constants';
import { EdgeFactory, NodeFactory } from 'shared/testing';
import { DesignData } from 'shared/types';
import { beforeEach, describe, expect } from 'vitest';

import {
	addEdge,
	addNode,
	mapDesignDataToPromptInterface,
	parsePromptResponseIntoCommands,
	removeEdge,
	removeNode,
	updateEdge,
	updateNode,
} from '@/api/prompt/utils';

describe('Prompt Util Tests', () => {
	let designData: DesignData;

	beforeEach(async () => {
		const nodes = await NodeFactory.batch(4);
		const edges = (await EdgeFactory.batch(2)).map((e, i) => {
			e.source = nodes[i].id;
			e.target = nodes[i + 2].id;
			return e;
		});

		designData = { edges, nodes };
	});

	describe('mapDesignDataToPromptInterface tests', () => {
		it('maps design data to prompt interface', () => {
			expect(mapDesignDataToPromptInterface(designData)).toEqual({
				edges: designData.edges,
				nodes: [
					{
						id: designData.nodes[0].id,
						nodeName: designData.nodes[0].data.formData.nodeName,
						nodeType: designData.nodes[0].data.nodeType,
						xPos: designData.nodes[0].position.x,
						yPos: designData.nodes[0].position.y,
					},
					{
						id: designData.nodes[1].id,
						nodeName: designData.nodes[1].data.formData.nodeName,
						nodeType: designData.nodes[1].data.nodeType,
						xPos: designData.nodes[1].position.x,
						yPos: designData.nodes[1].position.y,
					},
					{
						id: designData.nodes[2].id,
						nodeName: designData.nodes[2].data.formData.nodeName,
						nodeType: designData.nodes[2].data.nodeType,
						xPos: designData.nodes[2].position.x,
						yPos: designData.nodes[2].position.y,
					},
					{
						id: designData.nodes[3].id,
						nodeName: designData.nodes[3].data.formData.nodeName,
						nodeType: designData.nodes[3].data.nodeType,
						xPos: designData.nodes[3].position.x,
						yPos: designData.nodes[3].position.y,
					},
				],
			});
		});
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
					height: 256,
					nodeType: ServiceType.NestJs,
					shape: NodeShape.Rectangle,
					width: 256,
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
			const designData = { edges: [], nodes: [] };
			const input = ['1', 'invalid', 'node1', '10', '20'];

			expect(() => {
				addNode(input, designData);
			}).toThrow('Invalid node type: invalid');
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
			expect(() => {
				removeNode(['abc'], designData);
			}).toThrowError('Node with id abc not found');
		});
	});

	describe('updateNode tests', () => {
		it('updates a node', () => {
			const firstNode = designData.nodes[0];
			const input = [
				firstNode.id,
				'xPos',
				'500',
				'yPos',
				'500',
				'nodeType',
				ServiceType.Cassandra,
				'nodeName',
				'New Name',
			];

			updateNode(input, designData);
			expect(designData.nodes[0].data.nodeType).toEqual(
				ServiceType.Cassandra,
			);
			expect(designData.nodes[0].data.formData.nodeName).toBe('New Name');
			expect(designData.nodes[0].position.x).toBe(500);
			expect(designData.nodes[0].position.y).toBe(500);
		});

		it('does not modify the data if no properties are given', () => {
			const firstNode = designData.nodes[0];

			updateNode([firstNode.id], designData);
			expect(designData.nodes[0]).toEqual(firstNode);
		});

		it('throws an error when node index is not found', () => {
			expect(() => {
				updateNode(
					['abc', 'data', 'formData', 'nodeName', 'Node 2'],
					designData,
				);
			}).toThrow('Node with id abc not found');
		});
	});

	describe('addEdge tests', () => {
		it('adds an edge', () => {
			const designDataEdgesLength = designData.edges.length;
			const firstNode = designData.nodes[0];
			const secondNode = designData.nodes[1];
			const input = [
				'1',
				firstNode.id,
				secondNode.id,
				EdgeType.SmoothStep,
			];

			addEdge(input, designData);

			expect(designData.edges).toHaveLength(designDataEdgesLength + 1);
			expect(designData.edges[designDataEdgesLength]).toEqual({
				id: '1',
				source: firstNode.id,
				target: secondNode.id,
				type: EdgeType.SmoothStep,
			});
		});

		it('throws an error on invalid edgeType', () => {
			const designData = { edges: [], nodes: [] };
			const edge = ['1', 'source', 'target', 'invalid_type'];
			expect(() => {
				addEdge(edge, designData);
			}).toThrow('Invalid edge type: invalid_type');
		});
	});

	describe('removeEdge tests', () => {
		it('removes an edge', () => {
			const firstEdge = designData.edges[0];

			removeEdge([firstEdge.id], designData);

			expect(designData.edges).toEqual(
				designData.edges.filter((e) => e.id !== firstEdge.id),
			);
		});

		it('throws an error when edge index is not found', () => {
			expect(() => {
				removeEdge(['abc'], designData);
			}).toThrow(`Edge with id abc not found`);
		});
	});

	describe('updateEdge tests', () => {
		it('updates an edge', () => {
			const firstEdge = designData.edges[0];
			const input = [firstEdge.id, 'type', EdgeType.Straight];

			updateEdge(input, designData);
			expect(designData.edges[0].type).toEqual(EdgeType.Straight);
		});

		it('does not modify the data if no properties are given', () => {
			const firstEdge = designData.edges[0];
			const input = [firstEdge.id];

			updateEdge(input, designData);
			expect(designData.edges[0]).toEqual(firstEdge);
		});

		it('throws an error when edge index is not found', () => {
			expect(() => {
				updateEdge(['2', 'type', EdgeType.Straight], designData);
			}).toThrowError('Edge with id 2 not found');
		});
	});
});
