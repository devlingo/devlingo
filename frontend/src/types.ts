import { Edge, Node } from 'reactflow';

import { InternalNodeType, ServiceNodeType } from '@/constants';

export interface DropTargetData {
	dropEffect: string;
	nodeType: ServiceNodeType;
	x: number;
	y: number;
}

export type NodeType = ServiceNodeType | InternalNodeType;

export interface FormData {
	nodeName: string;
	[key: string]: any;
}

export interface NodeData<N extends NodeType> {
	nodeType: N;
	formData: FormData;
}

export interface ServiceNodeData extends NodeData<ServiceNodeType> {
	allowExpansion: boolean;
	childEdges: Edge[];
	childNodes: Node<InternalNodeData>[];
}

export interface InternalNodeData extends NodeData<InternalNodeType> {
	parentNodeId: string;
	parentNodeType: ServiceNodeType;
}
