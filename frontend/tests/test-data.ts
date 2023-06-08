import { Position } from '@reactflow/core';
import { v4 as uuidv4 } from 'uuid';

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

export const testData = {
	nestService,
	nextService,
	flutterService,
	nodes: [nestService, nextService, flutterService],
	edges: [
		{
			id: uuidv4(),
			source: nextService.id,
			target: nestService.id,
			sourceHandle: Position.Left,
			targetHandle: Position.Right,
		},
		{
			id: uuidv4(),
			source: flutterService.id,
			target: nestService.id,
			sourceHandle: Position.Left,
			targetHandle: Position.Right,
		},
	],
};
