import { Edge, Node } from 'reactflow';

import {
	ContainerNodeType,
	InternalNodeType,
	ServiceNodeType,
} from '@/constants';

export interface DropTargetData {
	dropEffect: string;
	nodeType: ServiceNodeType;
	x: number;
	y: number;
}

export type NodeType = ServiceNodeType | InternalNodeType | ContainerNodeType;
export type AnyNode = Node<
	InternalNodeData | ContainerNodeData | ServiceNodeData
>;

export interface FormData {
	nodeName: string;
	[key: string]: any;
}

export interface BaseNodeData<N extends NodeType> {
	nodeType: N;
	formData: FormData;
}

export interface ServiceNodeData extends BaseNodeData<ServiceNodeType> {
	childEdges?: Edge[];
	childNodes?: Node<InternalNodeData | ContainerNodeData>[];
}

export interface ContainerNodeData extends BaseNodeData<ContainerNodeType> {
	parentNodeId: string;
	parentNodeType: ServiceNodeType;
}

export interface InternalNodeData extends BaseNodeData<InternalNodeType> {
	parentNodeId: string;
	parentNodeType: ServiceNodeType;
}

export type NodeData<T> = T extends ServiceNodeType
	? ServiceNodeData
	: T extends InternalNodeType
	? InternalNodeData
	: ContainerNodeData;
