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
	ContainerNode,
	ContainerNodeData,
	InternalNode,
	InternalNodeData,
	NodeDataType,
} from '@/types';
import {
	isContainerNode,
	isInternalNode,
	isServiceNode,
} from '@/utils/predicates';

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
		node.data.childNodes ??= createDefaultInternalNodes(node.data.nodeType);
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
): Node<InternalNodeData | ContainerNodeData>[] {
	if (parentNodeType === ServiceNodeType.NestJs) {
		const moduleNode = createNode({
			position: { x: 400, y: 250 },
			data: {
				formData: { nodeName: 'App Module' },
				nodeType: ContainerNodeType.Module,
				parentNodeType,
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
				},
			}),
		];
	}
	return [];
}

export function calculateNodeArea(
	childNodes: InternalNode[],
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

export function setContainerNodesStyle(
	childNodes: (InternalNode | ContainerNode)[],
) {
	const containedNodes = childNodes.reduce<
		Record<string, InternalNode[] | undefined>
	>((acc, cur) => {
		if (isInternalNode(cur) && cur.parentNode) {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			acc[cur.parentNode] ??= [];
			acc[cur.parentNode]?.push(cur);
		}
		return acc;
	}, {});
	return childNodes.map((node) => {
		const internalNodes = containedNodes[node.id];
		if (
			isContainerNode(node) &&
			!node.data.isAreaCalculated &&
			internalNodes?.length
		) {
			node.style = calculateNodeArea(internalNodes);
			node.data.isAreaCalculated = true;
		}
		return node;
	});
}
