import { nanoid } from 'nanoid';
import { Edge, Node } from 'reactflow';

import { createServiceNode } from '@/components/flow/nodes/service-node';
import { InternalNodeType, ServiceNodeType } from '@/constants';
import { InternalNodeData } from '@/types';

const nestParentId = nanoid();

export const initialNodes: Node[] = [
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 1000, y: 50 },
		},
		nodeType: ServiceNodeType.NextJs,
		formData: { nodeName: 'Frontend' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nestParentId,
			position: { x: 700, y: 50 },
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
			position: { x: 700, y: 200 },
		},
		nodeType: ServiceNodeType.ExpressJs,
		formData: { nodeName: 'Backend' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 700, y: 350 },
		},
		nodeType: ServiceNodeType.Fastify,
		formData: { nodeName: 'Backend' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 700, y: 500 },
		},
		nodeType: ServiceNodeType.KoaJs,
		formData: { nodeName: 'Backend' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 700, y: 650 },
		},
		nodeType: ServiceNodeType.HapiJs,
		formData: { nodeName: 'Backend' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 400, y: 50 },
		},
		nodeType: ServiceNodeType.Litestar,
		formData: { nodeName: 'Backend' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 400, y: 200 },
		},
		nodeType: ServiceNodeType.Flask,
		formData: { nodeName: 'Backend' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 400, y: 350 },
		},
		nodeType: ServiceNodeType.Django,
		formData: { nodeName: 'Backend' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 400, y: 500 },
		},
		nodeType: ServiceNodeType.FastAPI,
		formData: { nodeName: 'Backend' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 100, y: 50 },
		},
		nodeType: ServiceNodeType.MongoDB,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 100, y: 200 },
		},
		nodeType: ServiceNodeType.Firestore,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 100, y: 350 },
		},
		nodeType: ServiceNodeType.Cassandra,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 100, y: 500 },
		},
		nodeType: ServiceNodeType.DynamoDB,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	// child nodes
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 100, y: 650 },
		},
		nodeType: ServiceNodeType.Redis,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 100, y: 800 },
		},
		nodeType: ServiceNodeType.Hbase,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: 100, y: 950 },
		},
		nodeType: ServiceNodeType.CosmosDB,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: -200, y: 50 },
		},
		nodeType: ServiceNodeType.MySQL,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: -200, y: 200 },
		},
		nodeType: ServiceNodeType.PostgresSQL,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: -200, y: 350 },
		},
		nodeType: ServiceNodeType.MicrosoftSQL,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: -200, y: 500 },
		},
		nodeType: ServiceNodeType.MariaDB,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: -200, y: 650 },
		},
		nodeType: ServiceNodeType.Firebird,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: -200, y: 800 },
		},
		nodeType: ServiceNodeType.SQLite,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
	createServiceNode({
		props: {
			id: nanoid(),
			position: { x: -200, y: 950 },
		},
		nodeType: ServiceNodeType.Oracle,
		formData: { nodeName: 'Database' },
		allowExpansion: true,
	}),
];

export const initialEdges: Edge[] = [];
