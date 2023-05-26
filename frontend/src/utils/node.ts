import { nanoid } from 'nanoid';
import { Node } from 'reactflow';

import {
	ContainerNodeType,
	InternalNodeType,
	REM,
	ServiceNodeType,
} from '@/constants';
import {
	ContainerNodeData,
	InternalNodeData,
	NodeData,
	NodeType,
	ServiceNodeData,
} from '@/types';

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

	const type = isServiceNode
		? 'ServiceNode'
		: Object.values(InternalNodeType).includes(
				data.nodeType as InternalNodeType,
		  )
		? 'InternalNode'
		: 'ContainerNode';

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
): Node<InternalNodeData | ContainerNodeData>[] {
	if (parentNodeType === ServiceNodeType.NestJs) {
		const moduleNode = createNode({
			position: { x: 400, y: 250 },
			data: {
				formData: { nodeName: 'App Module' },
				nodeType: ContainerNodeType.Module,
				parentNodeType,
				parentNodeId,
			},
		});
		return [
			moduleNode,
			createNode({
				parentNode: moduleNode.id,
				extent: 'parent',
				position: { x: 70, y: 90 },
				data: {
					formData: { nodeName: 'App Controller' },
					nodeType: InternalNodeType.Controller,
					parentNodeType,
					parentNodeId,
				},
			}),
			createNode({
				parentNode: moduleNode.id,
				extent: 'parent',
				position: { x: 70, y: 225 },
				data: {
					formData: { nodeName: 'App Service' },
					nodeType: InternalNodeType.Service,
					parentNodeType,
					parentNodeId,
				},
			}),
		];
	}
	return [];
}

export function calculateNodeArea(
	childNodes: Node<InternalNodeData>[],
	baseHeight = 105,
	baseWidth = 208,
) {
	const { xCoordinates, yCoordinates } = childNodes.reduce<{
		xCoordinates: number[];
		yCoordinates: number[];
	}>(
		(acc, cur) => {
			acc.xCoordinates.push(cur.position.x);
			acc.yCoordinates.push(cur.position.y);
			return acc;
		},
		{ xCoordinates: [], yCoordinates: [] },
	);

	const maxX = Math.max(...xCoordinates);
	const minX = Math.abs(Math.min(...xCoordinates));

	const maxY = Math.max(...yCoordinates);

	return {
		height: maxY + baseHeight + REM,
		width: maxX + baseWidth + minX,
	};
}
