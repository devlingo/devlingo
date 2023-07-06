import { v4 as uuidv4 } from 'uuid';
import { NodeData } from 'shared/types';

export function createNode({
	id,
	data,
	position,
	...props
}: {
	data: NodeData['data'];
	position: { x: number; y: number };
} & Record<string, any>): NodeData {
	return {
		...props,
		data,
		id: id ?? uuidv4(),
		position,
		type: 'CustomNode',
	};
}
