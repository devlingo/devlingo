import type { ServiceType, SystemComponentType } from 'shared/constants';
import { EdgeType, NodeShape } from 'shared/constants';
import type { Edge, Node } from 'reactflow';

export type FormData = {
	nodeName: string;
} & Record<string, any>;

export type NodeType = ServiceType | SystemComponentType;

export interface CustomNodeData {
	formData: FormData;
	nodeType: NodeType;
	shape: NodeShape;
	height: number;
	width: number;
}

export interface CustomEdgeData {
	edgeType: EdgeType;
}

export type CustomEdgeType = Edge<CustomEdgeData>;
export type CustomNodeType = Node<CustomNodeData>;
