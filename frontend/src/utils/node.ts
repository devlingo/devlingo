import { nanoid } from 'nanoid';
import { Node } from 'reactflow';

import { InternalNodeType, ServiceNodeType } from '@/constants';
import { InternalNodeData, NodeData, NodeType, ServiceNodeData } from '@/types';

export function createNode<T extends NodeType>({
	id,
	data,
	position,
	...props
}: {
	data: NodeData<T> & { nodeType: T };
	position: { x: number; y: number };
} & Omit<Partial<Node>, 'data' | 'type' | 'className'>): Node<NodeData<T>> {
	id ??= nanoid();
	const isServiceNode = Object.values(ServiceNodeType).includes(
		data.nodeType as ServiceNodeType,
	);
	const type = isServiceNode ? 'ServiceNode' : 'InternalNode';

	if (isServiceNode) {
		(data as ServiceNodeData).childNodes ??= createDefaultInternalNodes(
			data.nodeType as ServiceNodeType,
			id,
		);
	}

	return {
		data,
		id,
		position,
		type,
		...props,
	};
}

/*
	Creates the default internal nodes by type.

	TODO: move this logic into a format that can be stored inside a database
*/
export function createDefaultInternalNodes(
	parentNodeType: ServiceNodeType,
	parentNodeId: string,
): Node<InternalNodeData>[] {
	switch (parentNodeType) {
		case ServiceNodeType.NestJs:
			return [
				createNode({
					position: { x: 400, y: 250 },
					data: {
						formData: { nodeName: 'App Module' },
						nodeType: InternalNodeType.Module,
						parentNodeType,
						parentNodeId,
					},
				}),
			];
		default:
			return [];
	}
}
