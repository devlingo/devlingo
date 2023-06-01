import { Position } from '@reactflow/core';
import { nanoid } from 'nanoid';
import { Edge, Node } from 'reactflow';

import { ServiceNodeType } from '@/constants';
import { createNode } from '@/utils/node';

const nestService = createNode({
	position: { x: 700, y: 50 },
	data: {
		nodeType: ServiceNodeType.NestJs,
		formData: { nodeName: 'Backend' },
	},
});

const nextService = createNode({
	position: { x: 1300, y: 50 },
	data: {
		nodeType: ServiceNodeType.NextJs,
		formData: { nodeName: 'Frontend' },
	},
});

const flutterService = createNode({
	position: { x: 1300, y: 500 },
	data: {
		nodeType: ServiceNodeType.Flutter,
		formData: { nodeName: 'Mobile' },
	},
});

export const initialNodes: Node[] = [nestService, nextService, flutterService];

export const initialEdges: Edge[] = [
	{
		id: nanoid(),
		source: nextService.id,
		target: nestService.id,
		sourceHandle: `${nextService.id}-source-${Position.Left}`,
		targetHandle: `${nestService.id}-source-${Position.Right}`,
	},
	{
		id: nanoid(),
		source: flutterService.id,
		target: nestService.id,
		sourceHandle: `${flutterService.id}-source-${Position.Left}`,
		targetHandle: `${nestService.id}-source-${Position.Bottom}`,
	},
];
