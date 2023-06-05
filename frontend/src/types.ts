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
export type ServiceNode = Node<ServiceNodeData>;
export type InternalNode = Node<ServiceNodeData>;
export type ContainerNode = Node<ContainerNodeData>;
export type AnyNode = Node<Record<string, any>>;
export type NodeDataType =
	| ServiceNodeData
	| InternalNodeData
	| ContainerNodeData;

export type FormData = {
	nodeName: string;
} & Record<string, any>;

export interface BaseNodeData<N extends NodeType> {
	nodeType: N;
	formData: FormData;
}

export interface ServiceNodeData extends BaseNodeData<ServiceNodeType> {
	childEdges?: Edge[];
	childNodes?: AnyNode[];
}

export interface ContainerNodeData extends BaseNodeData<ContainerNodeType> {
	parentNodeType: ServiceNodeType;
	isAreaCalculated?: boolean;
}

export interface InternalNodeData extends BaseNodeData<InternalNodeType> {
	parentNodeType: ServiceNodeType;
}
