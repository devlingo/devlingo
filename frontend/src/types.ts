import { Edge, Node } from 'reactflow';

import { IconProps } from '@/assets';
import { NodeType } from '@/constants';

export interface NodeData {
	name: string;
	type: string;
	id: string;
	initialNodes: Node[];
	initialEdges: Edge[];
	NodeIcon: React.ComponentType<IconProps>;
}

export interface DropTargetData {
	dropEffect: string;
	type: NodeType;
	x: number;
	y: number;
}
