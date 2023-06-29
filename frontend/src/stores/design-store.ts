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
import { create, GetState, SetState } from 'zustand';

import {
	AnyNode,
	ContainerNode,
	InternalNode,
	NodeDataType,
	ServiceNode,
} from '@/types';
import { setContainerNodesStyle } from '@/utils/node';
import { isContainerNode } from '@/utils/predicates';
import { ViewPortData } from 'shared/types';

export interface FlowStore {
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
	setConfiguredNode: (nodeId: string | null) => void;
	setEdges: (edges: Edge[]) => void;
	setExpandedNode: (nodeId: string | null) => void;
	setNodes: (nodes: AnyNode[]) => void;
	setViewPort: (viewPort: ViewPortData) => void;
	updateNodeData: (nodeId: string, data: Partial<NodeDataType>) => void;
	viewPort: ViewPortData | null;
}

export function setNodes(
	set: SetState<FlowStore>,
	get: GetState<FlowStore>,
): (nodes: AnyNode[]) => void {
	return (nodes: AnyNode[]) => {
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
	};
}

export function setEdges(
	set: SetState<FlowStore>,
	get: GetState<FlowStore>,
): (edges: Edge[]) => void {
	return (edges: Edge[]) => {
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
	};
}

export function setExpandedNode(
	set: SetState<FlowStore>,
	get: GetState<FlowStore>,
): (nodeId: string | null) => void {
	return (nodeId: string | null) => {
		if (nodeId) {
			const expandedNode = get().allNodes.find((n) => n.id === nodeId)!;
			const { childNodes = [], childEdges = [] } = expandedNode.data;

			set({
				expandedNode: structuredClone(expandedNode),
			});

			const shouldSetContainedNodeStyle = childNodes.some(
				(n) => isContainerNode(n) && !n.data.isAreaCalculated,
			);

			get().setNodes(
				shouldSetContainedNodeStyle
					? setContainerNodesStyle(
							childNodes as (InternalNode | ContainerNode)[],
					  )
					: childNodes,
			);

			get().setEdges(childEdges);
		} else {
			set({
				edges: [...get().allEdges],
				expandedNode: null,
				nodes: [...get().allNodes],
			});
		}
	};
}

export function updateNodeData(
	_: SetState<FlowStore>,
	get: GetState<FlowStore>,
): (nodeId: string, data: Record<string, any>) => void {
	return (nodeId: string, data: Record<string, any>) => {
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
	};
}

export function setConfiguredNode(
	set: SetState<FlowStore>,
	get: GetState<FlowStore>,
): (nodeId: string | null) => void {
	return (nodeId: string | null) => {
		if (nodeId) {
			const isExpanded = !!get().expandedNode;
			const nodes = isExpanded ? get().nodes : get().allNodes;
			const node = nodes.find((n) => n.id === nodeId)!;
			set({
				configuredNode: node as
					| ServiceNode
					| InternalNode
					| ContainerNode,
			});
		} else {
			set({ configuredNode: null });
		}
	};
}

export function insertNode(
	_: SetState<FlowStore>,
	get: GetState<FlowStore>,
): (newNode: AnyNode) => void {
	return (newNode: AnyNode) => {
		const nodes = [
			...(get().expandedNode ? get().nodes : get().allNodes),
			newNode,
		];
		get().setNodes(nodes);
	};
}

export function onNodesChange(
	_: SetState<FlowStore>,
	get: GetState<FlowStore>,
): (changes: NodeChange[]) => void {
	return (changes: NodeChange[]) => {
		const nodes = get().expandedNode
			? applyNodeChanges(changes, get().nodes)
			: applyNodeChanges(changes, get().allNodes);

		get().setNodes(nodes);
	};
}

export function onEdgesChange(
	set: SetState<FlowStore>,
	get: GetState<FlowStore>,
): (changes: EdgeChange[]) => void {
	return (changes: EdgeChange[]) => {
		set({
			edges: applyEdgeChanges(changes, get().edges),
		});
	};
}

export function onConnect(
	set: SetState<FlowStore>,
	get: GetState<FlowStore>,
): (connection: Connection) => void {
	return (connection: Connection) => {
		set({
			edges: addEdge(connection, get().edges),
		});
	};
}

export function onEdgeUpdate(
	set: SetState<FlowStore>,
	get: GetState<FlowStore>,
): (edge: Edge, connection: Connection) => void {
	return (edge: Edge, connection: Connection) => {
		set({ edges: updateEdge(edge, connection, get().edges) });
	};
}

export function setViewPort(
	set: SetState<FlowStore>,
	_: GetState<FlowStore>,
): (viewPort: ViewPortData) => void {
	return (viewPort: ViewPortData) => {
		set({ viewPort });
	};
}

export const useDesignCanvasStore = create<FlowStore>((set, get) => ({
	edges: [],
	nodes: [],
	allEdges: [],
	allNodes: [],
	configuredNode: null,
	expandedNode: null,
	insertNode: insertNode(set, get),
	onConnect: onConnect(set, get),
	onEdgeUpdate: onEdgeUpdate(set, get),
	onEdgesChange: onEdgesChange(set, get),
	onNodesChange: onNodesChange(set, get),
	setConfiguredNode: setConfiguredNode(set, get),
	setEdges: setEdges(set, get),
	setExpandedNode: setExpandedNode(set, get),
	setNodes: setNodes(set, get),
	updateNodeData: updateNodeData(set, get),
	setViewPort: setViewPort(set, get),
	viewPort: null,
}));

export const useConfiguredNode = () =>
	useDesignCanvasStore((s) => s.configuredNode);
export const useDisplayEdges = () => useDesignCanvasStore((s) => s.edges);
export const useDisplayNodes = () => useDesignCanvasStore((s) => s.nodes);
export const useExpandedNode = () =>
	useDesignCanvasStore((s) => s.expandedNode);
export const useInsertNode = () => useDesignCanvasStore((s) => s.insertNode);
export const useSetConfiguredNode = () =>
	useDesignCanvasStore((s) => s.setConfiguredNode);
export const useSetEdges = () => useDesignCanvasStore((s) => s.setEdges);
export const useSetExpandedNode = () =>
	useDesignCanvasStore((s) => s.setExpandedNode);
export const useSetNodes = () => useDesignCanvasStore((s) => s.setNodes);
export const useUpdateNodeData = () =>
	useDesignCanvasStore((s) => s.updateNodeData);
export const useSetViewPort = () => useDesignCanvasStore((s) => s.setViewPort);
