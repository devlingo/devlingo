import { OnEdgeUpdateFunc } from '@reactflow/core';
import { assign } from 'radash';
import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Connection,
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	OnConnect,
	OnEdgesChange,
	OnNodesChange,
	updateEdge,
} from 'reactflow';
import { create } from 'zustand';

import { initialEdges, initialNodes } from '@/initial-data';
import {
	AnyNode,
	ContainerNode,
	InternalNode,
	InternalNodeData,
	NodeDataType,
	ServiceNode,
} from '@/types';
import { calculateNodeArea } from '@/utils/node';

export interface FlowStoreState {
	allEdges: Edge[];
	allNodes: ServiceNode[];
	configuredNode: ServiceNode | InternalNode | ContainerNode | null;
	edges: Edge[];
	expandedNode: ServiceNode | null;
	insertNode: (newNode: AnyNode) => void;
	nodes: AnyNode[];
	onConnect: OnConnect;
	onEdgeUpdate: OnEdgeUpdateFunc;
	onEdgesChange: OnEdgesChange;
	onNodesChange: OnNodesChange;
	setConfiguredNode: (nodeId: string, parentNodeId?: string | null) => void;
	setEdges: (edges: Edge[]) => void;
	setExpandedNode: (nodeId: string) => void;
	setNodes: (nodes: AnyNode[]) => void;
	unsetConfiguredNode: () => void;
	unsetExpandedNode: () => void;
	updateNodeData: (nodeId: string, data: Partial<NodeDataType>) => void;
}

export const useStore = create<FlowStoreState>((set, get) => ({
	allEdges: initialEdges,
	allNodes: initialNodes,
	edges: initialEdges,
	expandedNode: null,
	configuredNode: null,
	nodes: initialNodes,
	setNodes(nodes: AnyNode[]) {
		const expandedNode = get().expandedNode;

		if (expandedNode) {
			expandedNode.data.childNodes = nodes;

			set({
				expandedNode: structuredClone(expandedNode),
				nodes: [...nodes],
				allNodes: get().allNodes.map((node) => {
					if (node.id === expandedNode.id) {
						return structuredClone(expandedNode);
					}
					return node;
				}),
			});
		} else {
			set({
				nodes: [...nodes],
				allNodes: [...nodes] as ServiceNode[],
			});
		}
	},
	setEdges(edges: Edge[]) {
		const expandedNode = get().expandedNode;

		if (expandedNode) {
			expandedNode.data.childEdges = edges;

			set({
				expandedNode: structuredClone(expandedNode),
				edges: [...edges],
				allNodes: get().allNodes.map((node) => {
					if (node.id === expandedNode.id) {
						return structuredClone(expandedNode);
					}
					return node;
				}),
			});
		} else {
			set({
				edges: [...edges],
				allEdges: [...edges],
			});
		}
	},
	onNodesChange: (changes: NodeChange[]) => {
		const nodes = get().expandedNode
			? applyNodeChanges(changes, get().nodes)
			: applyNodeChanges(changes, get().allNodes);

		get().setNodes(nodes);
	},
	onEdgesChange: (changes: EdgeChange[]) => {
		set({
			edges: applyEdgeChanges(changes, get().edges),
		});
	},
	onConnect: (connection: Connection) => {
		set({
			edges: addEdge(connection, get().edges),
		});
	},
	onEdgeUpdate: (edge: Edge, connection: Connection) => {
		set({ edges: updateEdge(edge, connection, get().edges) });
	},
	setExpandedNode: (nodeId: string) => {
		const expandedNode = get().allNodes.find((n) => n.id === nodeId)!;
		const { childNodes = [], childEdges = [] } = expandedNode.data;
		const containedNodes = childNodes.filter(
			(n) => n.parentNode,
		) as Node<InternalNodeData>[];
		const containingNodeIds = new Set(
			containedNodes.map((n) => n.parentNode),
		);

		if (containingNodeIds.size) {
			const nodes = childNodes.map((node) => {
				if (containingNodeIds.has(node.id)) {
					node.style = calculateNodeArea(
						containedNodes.filter((n) => n.parentNode === node.id),
					);
				}
				return node;
			});
			set({
				edges: [...childEdges],
				expandedNode: structuredClone(expandedNode),
				nodes,
			});
		} else {
			set({
				edges: [...childEdges],
				expandedNode: structuredClone(expandedNode),
				nodes: [...childNodes],
			});
		}
	},
	unsetExpandedNode() {
		set({
			edges: [...get().allEdges],
			expandedNode: null,
			nodes: [...get().allNodes],
		});
	},
	updateNodeData(nodeId: string, data: Record<string, any>) {
		const nodeToUpdate = get().nodes.find((n) => n.id === nodeId)!;
		const mergedData = assign(nodeToUpdate.data, data);
		const nodes = (get().expandedNode ? get().nodes : get().allNodes).map(
			(node) => {
				if (node.id === nodeId) {
					return {
						...node,
						data: mergedData,
					};
				}
				return node;
			},
		);
		get().setNodes(nodes);
	},
	insertNode(newNode: AnyNode) {
		const nodes = [
			...(get().expandedNode ? get().nodes : get().allNodes),
			newNode,
		];
		get().setNodes(nodes);
	},
	setConfiguredNode(nodeId: string, parentNodeId?: string | null) {
		const node = get().allNodes.find((n) => n.id === parentNodeId)!;
		if (parentNodeId) {
			set({
				configuredNode: node.data.childNodes!.find(
					(n) => n.id === nodeId,
				)! as InternalNode | ContainerNode | ServiceNode,
			});
		} else {
			set({ configuredNode: node });
		}
	},
	unsetConfiguredNode() {
		set({ configuredNode: null });
	},
}));

export const useInsertNode = () => useStore((s) => s.insertNode);
export const useConfiguredNode = () => useStore((s) => s.configuredNode);
export const useUnsetExpandedNode = () => useStore((s) => s.unsetExpandedNode);
export const useSetExpandedNode = () => useStore((s) => s.setExpandedNode);
export const useExpandedNode = () => useStore((s) => s.expandedNode);
export const useUnsetConfiguredNode = () =>
	useStore((s) => s.unsetConfiguredNode);
export const useSetConfiguredNode = () => useStore((s) => s.setConfiguredNode);
export const useDisplayNodes = () => useStore((s) => s.nodes);
export const useDisplayEdges = () => useStore((s) => s.edges);
export const useUpdateNodeData = () => useStore((s) => s.updateNodeData);
export const useSetNodes = () => useStore((s) => s.setNodes);
export const useSetEdges = () => useStore((s) => s.setEdges);
