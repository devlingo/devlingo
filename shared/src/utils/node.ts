import { v4 as uuidv4 } from 'uuid';
import { CustomNodeData, NodeData } from 'shared/types';
import { NodeShape } from 'shared/constants';

export type CreateNodeParams = {
	data: Partial<CustomNodeData> & Pick<CustomNodeData, 'nodeType'>;
	position: { x: number; y: number };
} & Record<string, any>;

export function createNode({
	id,
	data: { formData, height, width, nodeType, shape },
	position,
	...props
}: CreateNodeParams): NodeData {
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
	} satisfies NodeData;
}
