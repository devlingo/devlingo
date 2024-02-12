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
import { EdgeType } from 'shared/constants';
import {
	CustomEdgeData,
	CustomEdgeType,
	CustomNodeData,
	CustomNodeType,
	ViewPortData,
} from 'shared/types';
import { createEdge } from 'shared/utils';
import { create, GetState, SetState } from 'zustand';
import { StateCreator } from 'zustand/vanilla';

export interface FlowStore {
	// form logic
	configuredNode: CustomNodeType | null;
	deleteEdge: (edgeId: string) => void;
	deleteNode: (nodeId: string) => void;
	// reactflow internals
	edges: CustomEdgeType[];
	nodes: CustomNodeType[];
	// reactflow handlers
	onConnect: OnConnect;
	onEdgeUpdate: OnEdgeUpdateFunc;
	onEdgesChange: OnEdgesChange;
	onNodesChange: OnNodesChange;
	setConfiguredNode: (nodeId: string | null) => void;
	// state handling
	setEdges: (edges: Edge[]) => void;
	setNodes: (nodes: CustomNodeType[]) => void;
	setViewPort: (viewport: ViewPortData) => void;
	updateEdge: (edgeId: string, data: Partial<CustomEdgeData>) => void;
	updateNode: (nodeId: string, data: Partial<CustomNodeData>) => void;
	viewport: ViewPortData;
}

export const flowStoreStateCreator: StateCreator<FlowStore> = (
	set: SetState<FlowStore>,
	get: GetState<FlowStore>,
) => ({
	// form logic
	configuredNode: null,

	deleteEdge: (edgeId: string) => {
		set({ edges: get().edges.filter((edge) => edge.id !== edgeId) });
	},

	deleteNode: (nodeId: string) => {
		set({ nodes: get().nodes.filter((node) => node.id !== nodeId) });
	},

	// reactflow internals
	edges: [],

	nodes: [],

	// reactflow handlers
	onConnect: (connection: Connection) => {
		const [edge] = addEdge(connection, []);
		set({
			edges: [
				...get().edges,
				createEdge({
					...edge,
					data: { edgeType: EdgeType.Bezier },
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
	updateEdge: (edgeId: string, data: Partial<CustomEdgeData>) => {
		set({
			edges: get().edges.map((edge) => {
				if (edge.id === edgeId) {
					return {
						...edge,
						data: {
							...edge.data,
							...data,
						} as CustomEdgeData,
					};
				}
				return edge;
			}),
		});
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
	viewport: { x: 0, y: 0, zoom: 0.5 },
});

export const useDesignCanvasStore = create(flowStoreStateCreator);
export const useConfiguredNode = () =>
	useDesignCanvasStore((s) => s.configuredNode);
export const useDeleteNode = () => useDesignCanvasStore((s) => s.deleteNode);
export const useDisplayEdges = () => useDesignCanvasStore((s) => s.edges);
export const useDisplayNodes = () => useDesignCanvasStore((s) => s.nodes);
export const useNodes = () => useDesignCanvasStore((s) => s.nodes);
export const useEdges = () => useDesignCanvasStore((s) => s.edges);
export const useSetConfiguredNode = () =>
	useDesignCanvasStore((s) => s.setConfiguredNode);
export const useSetEdges = () => useDesignCanvasStore((s) => s.setEdges);
export const useSetNodes = () => useDesignCanvasStore((s) => s.setNodes);
export const useSetViewPort = () => useDesignCanvasStore((s) => s.setViewPort);
export const useUpdateEdge = () => useDesignCanvasStore((s) => s.updateEdge);
export const useUpdateNode = () => useDesignCanvasStore((s) => s.updateNode);
export const useDeleteEdge = () => useDesignCanvasStore((s) => s.deleteEdge);
