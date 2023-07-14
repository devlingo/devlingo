import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Connection,
	Edge,
	EdgeChange,
	NodeChange,
	OnConnect,
	OnEdgesChange,
	OnEdgeUpdateFunc,
	OnNodesChange,
	updateEdge,
} from 'reactflow';
import {
	CustomEdgeData,
	CustomEdgeType,
	CustomNodeData,
	CustomNodeType,
	ViewPortData,
} from 'shared/types';
import { create, GetState, SetState } from 'zustand';
import { StateCreator } from 'zustand/vanilla';
import { createEdge } from 'shared/utils';
import { EdgeType } from 'shared/constants';

export interface FlowStore {
	// reactflow internals
	edges: CustomEdgeType[];
	nodes: CustomNodeType[];
	viewport: ViewPortData;
	// reactflow handlers
	onConnect: OnConnect;
	onEdgeUpdate: OnEdgeUpdateFunc;
	onEdgesChange: OnEdgesChange;
	onNodesChange: OnNodesChange;
	// form logic
	configuredNode: CustomNodeType | null;
	setConfiguredNode: (nodeId: string | null) => void;
	// state handling
	setEdges: (edges: Edge[]) => void;
	setNodes: (nodes: CustomNodeType[]) => void;
	setViewPort: (viewport: ViewPortData) => void;
	updateNode: (nodeId: string, data: Partial<CustomNodeData>) => void;
	deleteNode: (nodeId: string) => void;
	updateEdge: (edgeId: string, data: Partial<CustomEdgeData>) => void;
}

export const flowStoreStateCreator: StateCreator<FlowStore> = (
	set: SetState<FlowStore>,
	get: GetState<FlowStore>,
) => ({
	// reactflow internals
	edges: [],
	nodes: [],
	viewport: { x: 0, y: 0, zoom: 0.5 },
	// reactflow handlers
	onConnect: (connection: Connection) => {
		const [edge] = addEdge(connection, []);
		set({
			edges: [
				...get().edges,
				createEdge({
					...edge,
					data: { edgeType: EdgeType.BezierEdge },
				}),
			],
		});
	},
	onEdgeUpdate: (edge: Edge, connection: Connection) => {
		set({ edges: updateEdge(edge, connection, get().edges) });
	},
	onEdgesChange: (changes: EdgeChange[]) => {
		set({
			edges: applyEdgeChanges(changes, get().edges),
		});
	},
	onNodesChange: (changes: NodeChange[]) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes),
		});
	},
	// form logic
	configuredNode: null,
	setConfiguredNode: (nodeId: string | null) => {
		set({
			configuredNode: nodeId
				? get().nodes.find((n) => n.id === nodeId)!
				: null,
		});
	},
	// state handling
	setEdges: (edges: Edge[]) => {
		set({
			edges: [...edges],
		});
	},
	setNodes: (nodes: CustomNodeType[]) => {
		set({
			nodes: [...nodes],
		});
	},
	setViewPort: (viewport: ViewPortData) => {
		set({ viewport });
	},
	deleteNode: (nodeId: string) => {
		set({ nodes: get().nodes.filter((node) => node.id !== nodeId) });
	},
	updateNode: (nodeId: string, data: Partial<CustomNodeData>) => {
		set({
			nodes: get().nodes.map((node) => {
				if (node.id === nodeId) {
					return {
						...node,
						data: {
							...node.data,
							...data,
						},
					};
				}
				return node;
			}),
		});
	},
	updateEdge: (edgeId: string, data: CustomEdgeData) => {
		set({
			edges: get().edges.map((edge) => {
				if (edge.id === edgeId) {
					return {
						...edge,
						data: {
							...edge.data,
							...data,
						},
					};
				}
				return edge;
			}),
		});
	},
});

export const useDesignCanvasStore = create(flowStoreStateCreator);
export const useConfiguredNode = () =>
	useDesignCanvasStore((s) => s.configuredNode);
export const useDeleteNode = () => useDesignCanvasStore((s) => s.deleteNode);
export const useDisplayEdges = () => useDesignCanvasStore((s) => s.edges);
export const useDisplayNodes = () => useDesignCanvasStore((s) => s.nodes);
export const useEdges = () => useDesignCanvasStore((s) => s.nodes);
export const useNodes = () => useDesignCanvasStore((s) => s.nodes);
export const useSetConfiguredNode = () =>
	useDesignCanvasStore((s) => s.setConfiguredNode);
export const useSetEdges = () => useDesignCanvasStore((s) => s.setEdges);
export const useSetNodes = () => useDesignCanvasStore((s) => s.setNodes);
export const useSetViewPort = () => useDesignCanvasStore((s) => s.setViewPort);
export const useUpdateEdge = () => useDesignCanvasStore((s) => s.updateEdge);
export const useUpdateNode = () => useDesignCanvasStore((s) => s.updateNode);
