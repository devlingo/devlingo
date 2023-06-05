import { Node } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

import {
	ContainerNodeType,
	InternalNodeType,
	REM,
	ServiceNodeType,
} from '@/constants';
import {
	AnyNode,
	ContainerNodeData,
	InternalNodeData,
	NodeDataType,
} from '@/types';
import { isInternalNode, isServiceNode } from '@/utils/predicates';

export type CreateNodeParams<T extends NodeDataType> = {
	data: T;
	position: { x: number; y: number };
} & Omit<Partial<Node<T>>, 'data' | 'type' | 'className'>;

export function createNode<T extends NodeDataType>({
	id,
	data,
	position,
	...props
}: CreateNodeParams<T>): Node<T> {
	const node = {
		data,
		id: id ?? uuidv4(),
		position,
		...props,
	} as unknown as AnyNode;

	if (isServiceNode(node)) {
		node.type = 'ServiceNode';
		node.data.childNodes ??= createDefaultInternalNodes(
			node.data.nodeType,
			node.id,
		);
	} else if (isInternalNode(node)) {
		node.type = 'InternalNode';
	} else {
		node.type = 'ContainerNode';
	}

	return node as Node<T>;
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
