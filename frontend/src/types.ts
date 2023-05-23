import { Edge, Node } from 'reactflow';

import { InternalNodeType, ServiceNodeType } from '@/constants';

export interface DropTargetData {
	dropEffect: string;
	nodeType: ServiceNodeType;
	x: number;
	y: number;
}

export type NodeType = ServiceNodeType | InternalNodeType;

export interface NodeData<
	N extends NodeType,
	T extends Record<string, any> = Record<string, any>,
> {
	formData: T;
	nodeType: N;
	nodeName: string;
}

export interface ServiceNodeData<
	T extends Record<string, any> = Record<string, any>,
> extends NodeData<ServiceNodeType, T> {
	allowExpansion: boolean;
	childEdges: Edge[];
	childNodes: Node<InternalNodeData>[];
}

export interface InternalNodeData<
	T extends Record<string, any> = Record<string, any>,
> extends NodeData<InternalNodeType, T> {
	parentNodeType: ServiceNodeType;
}
