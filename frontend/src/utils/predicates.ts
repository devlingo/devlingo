import {
	ContainerNodeType,
	InternalNodeType,
	ServiceNodeType,
} from '@/constants';
import { AnyNode, ContainerNode, InternalNode, ServiceNode } from '@/types';

export function isServiceNode(node: AnyNode): node is ServiceNode {
	return Object.values(ServiceNodeType).includes(
		node.data.nodeType as unknown as ServiceNodeType,
	);
}

export function isInternalNode(node: AnyNode): node is InternalNode {
	return Object.values(InternalNodeType).includes(
		node.data.nodeType as InternalNodeType,
	);
}

export function isContainerNode(node: AnyNode): node is ContainerNode {
	return Object.values(ContainerNodeType).includes(
		node.data.nodeType as ContainerNodeType,
	);
}
