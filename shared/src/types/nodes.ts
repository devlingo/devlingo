import type { ServiceType, SystemComponentType } from 'shared/constants';
import { NodeShape } from 'shared/constants';

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
