import { nanoid } from 'nanoid';
import { Edge, Node, Position } from 'reactflow';

import { createServiceNode } from '@/components/flow/nodes/service-node';
import { InternalNodeType, ServiceNodeType } from '@/constants';
import { InternalNodeData } from '@/types';

const nestParentId = nanoid();

export const initialNodes: Node[] = [
	createServiceNode({
		props: {
			id: nestParentId,
			position: { x: 50, y: 50 },
		},
		nodeType: ServiceNodeType.NestJs,
		formData: { nodeName: 'Backend' },
		allowExpansion: true,
		childNodes: [
			{
				id: nanoid(),
				type: 'InternalNode',
				data: {
					formData: { nodeName: 'Users' },
					nodeType: InternalNodeType.Controller,
					parentNodeType: ServiceNodeType.NestJs,
				} satisfies InternalNodeData,
				position: { x: 100, y: 0 },
			},
			{
				id: nanoid(),
				type: 'InternalNode',
				data: {
					formData: { nodeName: 'Purchase' },
					nodeType: InternalNodeType.Service,
					parentNodeType: ServiceNodeType.NestJs,
				} satisfies InternalNodeData,
				position: { x: 500, y: 0 },
			},
		],
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 650, y: 50 },
		},
		nodeType: ServiceNodeType.NextJs,
		formData: { nodeName: 'Frontend' },
		allowExpansion: true,
	}),
];

export const initialEdges: Edge[] = [
	{
		id: 'edge-button',
		source: initialNodes[0].id,
		target: initialNodes[1].id,
		sourceHandle: `${initialNodes[0].id}-source-${Position.Right}`,
		targetHandle: `${initialNodes[1].id}-source-${Position.Left}`,
		type: 'HttpRestEdge',
	},
];
