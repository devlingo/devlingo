import { nanoid } from 'nanoid';
import { Edge, Node, Position } from 'reactflow';

import { NestJSIcon, NextJSIcon } from '@/assets';
import { NodeWithIconData } from '@/components/flow/nodes/node-with-icon';
import { NodeType } from '@/constants';

export const nodes: Node[] = [
	{
		id: nanoid(),
		type: 'input',
		style: {
			margin: 0,
			padding: 0,
		},
		data: {
			label: (
				<div className="flex justify-evenly p-4 bg-base-100 text-base-content">
					<NestJSIcon width={18} height={18} alt={'nest'} />
					App Root
				</div>
			),
		},
		position: { x: 250, y: 0 },
	},
	{
		id: nanoid(),
		type: 'output',
		style: {
			background: '#63B3ED',
			color: 'white',
			width: 100,
		},
		data: {
			label: 'Purchase Controller',
		},
		position: { x: 100, y: 100 },
	},
	{
		id: nanoid(),
		type: 'output',
		style: {
			background: '#63B3ED',
			color: 'white',
			width: 100,
		},
		data: {
			label: 'User Controller',
		},
		position: { x: 500, y: 100 },
	},
];

export const edges: Edge[] = [
	{ id: nanoid(), source: '1', target: '2', animated: true },
	{ id: nanoid(), source: '1', target: '3', animated: true },
];

export const initialNodes: Node[] = [
	{
		id: nanoid(),
		type: 'NodeWithIcon',
		data: {
			Icon: NestJSIcon,
			tag: 'nest-service',
			name: 'My Service',
			type: NodeType.NestJs,
			internalNodes: nodes,
			internalEdges: edges,
		} satisfies NodeWithIconData,
		position: { x: 50, y: 50 },
	},

	{
		id: nanoid(),
		type: 'NodeWithIcon',
		data: {
			Icon: NextJSIcon,
			tag: 'next-service',
			name: 'My Frontend',
			type: NodeType.NextJs,
			internalNodes: [],
			internalEdges: [],
		} satisfies NodeWithIconData,
		position: { x: 650, y: 50 },
	},
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
