import { OnEdgeUpdateFunc } from '@reactflow/core';
import { deepmerge } from 'deepmerge-ts';
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
	OnNodesChange,
	updateEdge,
} from 'reactflow';
import { create } from 'zustand';

import { initialEdges, initialNodes } from '@/initial-data';
import {
	AnyNode,
	ContainerNode,
	InternalNode,
	NodeDataType,
	ServiceNode,
} from '@/types';
import { setContainerNodesStyle } from '@/utils/node';
import { isContainerNode } from '@/utils/predicates';

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
	setConfiguredNode: (nodeId: string) => void;
	setEdges: (edges: Edge[]) => void;
	setExpandedNode: (nodeId: string) => void;
	setNodes: (nodes: AnyNode[]) => void;
	unsetConfiguredNode: () => void;
	unsetExpandedNode: () => void;
	updateNodeData: (nodeId: string, data: Partial<NodeDataType>) => void;
}

export const useStore = create<FlowStoreState>((set, get) => ({
	edges: [...initialEdges],
	nodes: [...initialNodes],
	allEdges: [...initialEdges],
	allNodes: [...initialNodes],
	configuredNode: null,
	expandedNode: null,
	setNodes(nodes: AnyNode[]) {
		const expandedNode = get().expandedNode;

		if (expandedNode) {
			expandedNode.data.childNodes = nodes;

			set({
				//expandedNode: structuredClone(expandedNode),
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
	setExpandedNode: (nodeId: string) => {
		const expandedNode = get().allNodes.find((n) => n.id === nodeId)!;
		const { childNodes = [], childEdges = [] } = expandedNode.data;

		set({
			expandedNode: structuredClone(expandedNode),
		});

		const shouldSetContaineNodeStyle = childNodes.some(
			(n) => isContainerNode(n) && !n.data.isAreaCalculated,
		);

		get().setNodes(
			shouldSetContaineNodeStyle
				? setContainerNodesStyle(
						childNodes as (InternalNode | ContainerNode)[],
				  )
				: childNodes,
		);

		get().setEdges(childEdges);
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
		const mergedData = deepmerge(nodeToUpdate.data, data);
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
	insertNode(newNode: AnyNode) {
		const nodes = [
			...(get().expandedNode ? get().nodes : get().allNodes),
			newNode,
		];
		get().setNodes(nodes);
	},
	setConfiguredNode(nodeId: string) {
		const isExpanded = !!get().expandedNode;
		const nodes = isExpanded ? get().nodes : get().allNodes;
		const node = nodes.find((n) => n.id === nodeId)! as
			| ServiceNode
			| InternalNode
			| ContainerNode;
		set({ configuredNode: node });
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
