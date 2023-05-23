import { UISchemaElement } from '@jsonforms/core';

import { InternalNodeType, ServiceNodeType } from '@/constants';
import { NodeType } from '@/types';

const exampleUISchema = {
	type: 'VerticalLayout',
	elements: [
		{
			type: 'Control',
			label: 'name',
			scope: '#/properties/nodeName',
		},
	],
};

const nestJSServiceUISchema: UISchemaElement = exampleUISchema;
const nextJSServiceUISchema: UISchemaElement = exampleUISchema;

export const typeUISchemaMap: Record<NodeType, UISchemaElement> = {
	// frontend frameworks
	[ServiceNodeType.NextJs]: nextJSServiceUISchema,
	// db nosql
	[ServiceNodeType.Cassandra]: exampleUISchema,
	[ServiceNodeType.CosmosDB]: exampleUISchema,
	[ServiceNodeType.DynamoDB]: exampleUISchema,
	[ServiceNodeType.Firestore]: exampleUISchema,
	[ServiceNodeType.Hbase]: exampleUISchema,
	[ServiceNodeType.MongoDB]: exampleUISchema,
	[ServiceNodeType.Redis]: exampleUISchema,
	// db-sql
	[ServiceNodeType.Firebird]: exampleUISchema,
	[ServiceNodeType.MariaDB]: exampleUISchema,
	[ServiceNodeType.MicrosoftSQL]: exampleUISchema,
	[ServiceNodeType.MySQL]: exampleUISchema,
	[ServiceNodeType.Oracle]: exampleUISchema,
	[ServiceNodeType.PostgresSQL]: exampleUISchema,
	[ServiceNodeType.SQLite]: exampleUISchema,
	// server js
	[ServiceNodeType.ExpressJs]: exampleUISchema,
	[ServiceNodeType.Fastify]: exampleUISchema,
	[ServiceNodeType.HapiJs]: exampleUISchema,
	[ServiceNodeType.KoaJs]: exampleUISchema,
	[ServiceNodeType.NestJs]: exampleUISchema,
	[ServiceNodeType.NestJs]: nestJSServiceUISchema,
	// server py
	[ServiceNodeType.Django]: exampleUISchema,
	[ServiceNodeType.FastAPI]: exampleUISchema,
	[ServiceNodeType.Flask]: exampleUISchema,
	[ServiceNodeType.Litestar]: exampleUISchema,
	// internal nodes
	[InternalNodeType.Controller]: exampleUISchema,
	[InternalNodeType.Endpoint]: exampleUISchema,
	[InternalNodeType.Module]: exampleUISchema,
	[InternalNodeType.Service]: exampleUISchema,
};
