import { UISchemaElement } from '@jsonforms/core';

import { InternalNodeType, ServiceNodeType } from '@/constants';
import { NodeType } from '@/types';

export const NodeNameFormUISchema = {
	type: 'VerticalLayout',
	elements: [
		{
			type: 'Control',
			label: 'name',
			scope: '#/properties/nodeName',
		},
	],
};

const nestJSServiceUISchema: UISchemaElement = NodeNameFormUISchema;
const nextJSServiceUISchema: UISchemaElement = NodeNameFormUISchema;

export const typeUISchemaMap: Record<NodeType, UISchemaElement> = {
	// frontend frameworks
	[ServiceNodeType.NextJs]: nextJSServiceUISchema,
	// db nosql
	[ServiceNodeType.Cassandra]: NodeNameFormUISchema,
	[ServiceNodeType.CosmosDB]: NodeNameFormUISchema,
	[ServiceNodeType.DynamoDB]: NodeNameFormUISchema,
	[ServiceNodeType.Firestore]: NodeNameFormUISchema,
	[ServiceNodeType.Hbase]: NodeNameFormUISchema,
	[ServiceNodeType.MongoDB]: NodeNameFormUISchema,
	[ServiceNodeType.Redis]: NodeNameFormUISchema,
	// db-sql
	[ServiceNodeType.Firebird]: NodeNameFormUISchema,
	[ServiceNodeType.MariaDB]: NodeNameFormUISchema,
	[ServiceNodeType.MicrosoftSQL]: NodeNameFormUISchema,
	[ServiceNodeType.MySQL]: NodeNameFormUISchema,
	[ServiceNodeType.Oracle]: NodeNameFormUISchema,
	[ServiceNodeType.PostgresSQL]: NodeNameFormUISchema,
	[ServiceNodeType.SQLite]: NodeNameFormUISchema,
	// server js
	[ServiceNodeType.ExpressJs]: NodeNameFormUISchema,
	[ServiceNodeType.Fastify]: NodeNameFormUISchema,
	[ServiceNodeType.HapiJs]: NodeNameFormUISchema,
	[ServiceNodeType.KoaJs]: NodeNameFormUISchema,
	[ServiceNodeType.NestJs]: NodeNameFormUISchema,
	[ServiceNodeType.NestJs]: nestJSServiceUISchema,
	// server py
	[ServiceNodeType.Django]: NodeNameFormUISchema,
	[ServiceNodeType.FastAPI]: NodeNameFormUISchema,
	[ServiceNodeType.Flask]: NodeNameFormUISchema,
	[ServiceNodeType.Litestar]: NodeNameFormUISchema,
	// internal nodes
	[InternalNodeType.Controller]: NodeNameFormUISchema,
	[InternalNodeType.Endpoint]: NodeNameFormUISchema,
	[InternalNodeType.Module]: NodeNameFormUISchema,
	[InternalNodeType.Service]: NodeNameFormUISchema,
};
