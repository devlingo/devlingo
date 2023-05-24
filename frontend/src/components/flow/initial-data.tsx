import { Edge, Node } from 'reactflow';

import { ServiceNodeType } from '@/constants';
import { createNode } from '@/utils/node';

export const initialNodes: Node[] = [
	createNode({
		position: { x: 1000, y: 50 },
		data: {
			nodeType: ServiceNodeType.NextJs,
			formData: { nodeName: 'Frontend' },
		},
	}),
	createNode({
		position: { x: 700, y: 50 },
		data: {
			nodeType: ServiceNodeType.NestJs,
			formData: { nodeName: 'Backend' },
		},
	}),
	createNode({
		position: { x: 700, y: 200 },
		data: {
			nodeType: ServiceNodeType.ExpressJs,
			formData: { nodeName: 'Backend' },
		},
	}),
	createNode({
		position: { x: 700, y: 350 },
		data: {
			nodeType: ServiceNodeType.Fastify,
			formData: { nodeName: 'Backend' },
		},
	}),
	createNode({
		position: { x: 700, y: 500 },
		data: {
			nodeType: ServiceNodeType.KoaJs,
			formData: { nodeName: 'Backend' },
		},
	}),
	createNode({
		position: { x: 700, y: 650 },
		data: {
			nodeType: ServiceNodeType.HapiJs,
			formData: { nodeName: 'Backend' },
		},
	}),
	createNode({
		position: { x: 400, y: 50 },
		data: {
			nodeType: ServiceNodeType.Litestar,
			formData: { nodeName: 'Backend' },
		},
	}),
	createNode({
		position: { x: 400, y: 200 },
		data: {
			nodeType: ServiceNodeType.Flask,
			formData: { nodeName: 'Backend' },
		},
	}),
	createNode({
		position: { x: 400, y: 350 },
		data: {
			nodeType: ServiceNodeType.Django,
			formData: { nodeName: 'Backend' },
		},
	}),
	createNode({
		position: { x: 400, y: 500 },
		data: {
			nodeType: ServiceNodeType.FastAPI,
			formData: { nodeName: 'Backend' },
		},
	}),
	createNode({
		position: { x: 100, y: 50 },
		data: {
			nodeType: ServiceNodeType.MongoDB,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: 100, y: 200 },
		data: {
			nodeType: ServiceNodeType.Firestore,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: 100, y: 350 },
		data: {
			nodeType: ServiceNodeType.Cassandra,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: 100, y: 500 },
		data: {
			nodeType: ServiceNodeType.DynamoDB,
			formData: { nodeName: 'Database' },
		},
	}),
	// child nodes
	createNode({
		position: { x: 100, y: 650 },
		data: {
			nodeType: ServiceNodeType.Redis,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: 100, y: 800 },
		data: {
			nodeType: ServiceNodeType.Hbase,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: 100, y: 950 },
		data: {
			nodeType: ServiceNodeType.CosmosDB,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: -200, y: 50 },
		data: {
			nodeType: ServiceNodeType.MySQL,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: -200, y: 200 },
		data: {
			nodeType: ServiceNodeType.PostgresSQL,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: -200, y: 350 },
		data: {
			nodeType: ServiceNodeType.MicrosoftSQL,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: -200, y: 500 },
		data: {
			nodeType: ServiceNodeType.MariaDB,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: -200, y: 650 },
		data: {
			nodeType: ServiceNodeType.Firebird,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: -200, y: 800 },
		data: {
			nodeType: ServiceNodeType.SQLite,
			formData: { nodeName: 'Database' },
		},
	}),
	createNode({
		position: { x: -200, y: 950 },
		data: {
			nodeType: ServiceNodeType.Oracle,
			formData: { nodeName: 'Database' },
		},
	}),
];

export const initialEdges: Edge[] = [];
