import { Node } from 'reactflow';
import { NodeType } from 'shared/types';

export interface DropTargetData {
	dropEffect: string;
	nodeType: NodeType;
	x: number;
	y: number;
}

export interface CustomNodeData {
	nodeType: NodeType;
	formData: FormData;
}

export type CustomNodeType = Node<CustomNodeData>;

export type FormData = {
	nodeName: string;
} & Record<string, any>;

export type ImageType = 'png' | 'jpeg' | 'svg';
