import { v4 as uuidv4 } from 'uuid';
import {
	CustomEdgeData,
	CustomEdgeType,
	CustomNodeData,
	CustomNodeType,
} from 'shared/types';
import { NodeShape } from 'shared/constants';
import type { Node, Edge } from 'reactflow';

export type CreateNodeParams = {
	data: Partial<CustomNodeData> & Pick<CustomNodeData, 'nodeType'>;
	position: { x: number; y: number };
} & Partial<Omit<Node<CustomNodeData>, 'data' | 'position' | 'type'>>;

export function createNode({
	id,
	data: { formData, height, width, nodeType, shape },
	position,
	...props
}: CreateNodeParams): CustomNodeType {
	return {
		...props,
		data: {
			formData: formData ?? { nodeName: 'Untitled' },
			height: height ?? 256,
			width: width ?? 256,
			shape: shape ?? NodeShape.Rectangle,
			nodeType,
		},
		id: id ?? uuidv4(),
		position,
		type: 'CustomNode',
	} satisfies CustomNodeType;
}

export type CreateEdgeParams = {
	data: CustomEdgeData;
	source: string;
	target: string;
} & Partial<
	Omit<
		Edge<CustomEdgeData>,
		'data' | 'type' | 'source' | 'target' | 'sourceHandle' | 'targetHandle'
	>
>;

export function createEdge({
	id,
	data,
	...props
}: CreateEdgeParams): CustomEdgeType {
	return {
		...props,
		id: id ?? uuidv4(),
		data,
		type: 'CustomEdge',
	};
}
