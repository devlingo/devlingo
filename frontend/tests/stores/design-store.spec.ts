import { NodeAddChange } from '@reactflow/core/dist/esm/types/changes';
import { Connection, Edge, EdgeAddChange, EdgeChange } from 'reactflow';
import { EdgeType } from 'shared/constants';
import { EdgeFactory, NodeFactory } from 'shared/testing';
import { createEdge } from 'shared/utils';

import { flowStoreStateCreator } from '@/stores/design-store';

describe('flowStoreStateCreator tests', () => {
	const set = vi.fn();
	const get = vi.fn();

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('handles edge connection', () => {
		get.mockReturnValueOnce({
			edges: [],
		});
		const store = flowStoreStateCreator(set, get, {} as any);

		const connection = { source: 'a', target: 'b' } as Connection;
		store.onConnect(connection);
		expect(set).toHaveBeenCalledWith({
			edges: [
				createEdge({
					data: { edgeType: EdgeType.Bezier },
					id: `reactflow__edge-a-b`,
					source: connection.source!,
					target: connection.target!,
				}),
			],
		});
	});

	it('handles edge update', () => {
		get.mockReturnValueOnce({
			edges: [{ id: 'a-b', source: 'a', target: 'b' }],
		});
		const store = flowStoreStateCreator(set, get, {} as any);

		const edge = { id: 'a-b', source: 'a', target: 'b' } as Edge;
		const connection = { source: 'a', target: 'c' } as Connection;
		store.onEdgeUpdate(edge, connection);
		expect(set).toHaveBeenCalledWith({
			edges: [
				{
					id: 'reactflow__edge-a-c',
					source: connection.source,
					target: connection.target,
					sourceHandle: undefined,
					targetHandle: undefined,
				},
			],
		});
	});

	it('handles edge change', async () => {
		const existingEdge = await EdgeFactory.build();
		get.mockReturnValueOnce({
			edges: [existingEdge],
		});
		const store = flowStoreStateCreator(set, get, {} as any);

		const newEdge = await EdgeFactory.build();
		const changes = [{ type: 'add', item: newEdge } as EdgeAddChange];
		store.onEdgesChange(changes as unknown as EdgeChange[]);
		expect(set).toHaveBeenCalledWith({
			edges: [newEdge, existingEdge],
		});
	});

	it('handles node change', async () => {
		const existingNode = await NodeFactory.build();
		get.mockReturnValueOnce({
			nodes: [existingNode],
		});
		const store = flowStoreStateCreator(set, get, {} as any);

		const node = await NodeFactory.build();
		const changes = [{ type: 'add', item: node } satisfies NodeAddChange];
		store.onNodesChange(changes);
		expect(set).toHaveBeenCalledWith({
			nodes: [node, existingNode],
		});
	});

	it('sets a configured node', () => {
		get.mockReturnValueOnce({
			nodes: [{ id: 'a', type: 'input' }],
			configuredNode: null,
		});
		const store = flowStoreStateCreator(set, get, {} as any);

		store.setConfiguredNode('a');
		expect(set).toHaveBeenCalledWith({
			configuredNode: { id: 'a', type: 'input' },
		});
	});

	it('sets edges', () => {
		get.mockReturnValueOnce({
			edges: [],
		});
		const store = flowStoreStateCreator(set, get, {} as any);

		const edges = [{ id: 'a-b', source: 'a', target: 'b' }];
		store.setEdges(edges);
		expect(set).toHaveBeenCalledWith({ edges });
	});

	it('sets nodes', async () => {
		get.mockReturnValueOnce({
			nodes: [],
		});
		const store = flowStoreStateCreator(set, get, {} as any);

		const nodes = await NodeFactory.batch(3);
		store.setNodes(nodes);
		expect(set).toHaveBeenCalledWith({ nodes });
	});

	it('sets the viewport', () => {
		get.mockReturnValueOnce({
			viewport: { x: 0, y: 0, zoom: 0.5 },
		});
		const store = flowStoreStateCreator(set, get, {} as any);
		const viewport = { x: 1, y: 1, zoom: 1 };
		store.setViewPort(viewport);
		expect(set).toHaveBeenCalledWith({ viewport });
	});
});
