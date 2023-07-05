import { Node } from 'reactflow';
import { CustomNodeData, NodeType } from 'shared/types';

export interface DropTargetData {
	dropEffect: string;
	nodeType: NodeType;
	x: number;
	y: number;
}

export type CustomNodeType = Node<CustomNodeData>;

export type ImageType = 'png' | 'jpeg' | 'svg';
