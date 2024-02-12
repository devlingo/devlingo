import { Position } from '@reactflow/core';
import { ServiceType } from 'shared/constants';
import { createNode } from 'shared/utils/design';
import { v4 as uuidv4 } from 'uuid';

const nestService = createNode({
	data: {
		formData: { nodeName: 'Backend' },
		nodeType: ServiceType.NestJs,
	},
	position: { x: 700, y: 50 },
});

const nextService = createNode({
	data: {
		formData: { nodeName: 'Frontend' },
		nodeType: ServiceType.NextJs,
	},
	position: { x: 1300, y: 50 },
});

const flutterService = createNode({
	data: {
		formData: { nodeName: 'Mobile' },
		nodeType: ServiceType.Flutter,
	},
	position: { x: 1300, y: 500 },
});

export const testData = {
	edges: [
		{
			id: uuidv4(),
			source: nextService.id,
			sourceHandle: Position.Left,
			target: nestService.id,
			targetHandle: Position.Right,
		},
		{
			id: uuidv4(),
			source: flutterService.id,
			sourceHandle: Position.Left,
			target: nestService.id,
			targetHandle: Position.Right,
		},
	],
	flutterService,
	nestService,
	nextService,
	nodes: [nestService, nextService, flutterService],
};
