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
	[ServiceNodeType.NestJs]: nestJSServiceUISchema,
	[ServiceNodeType.NextJs]: nextJSServiceUISchema,
	[InternalNodeType.Service]: exampleUISchema,
	[InternalNodeType.Controller]: exampleUISchema,
	[InternalNodeType.Endpoint]: exampleUISchema,
	//db-nosql
	[ServiceNodeType.MongoDB]: exampleUISchema,
	[ServiceNodeType.Firestore]: exampleUISchema,
	[ServiceNodeType.Cassandra]: exampleUISchema,
	[ServiceNodeType.DynamoDB]: exampleUISchema,
	[ServiceNodeType.Redis]: exampleUISchema,
	[ServiceNodeType.Hbase]: exampleUISchema,
	[ServiceNodeType.CosmosDB]: exampleUISchema,
	//db-sql
	[ServiceNodeType.MySQL]: exampleUISchema,
	[ServiceNodeType.PostgresSQL]: exampleUISchema,
	[ServiceNodeType.MicrosoftSQL]: exampleUISchema,
	[ServiceNodeType.MariaDB]: exampleUISchema,
	[ServiceNodeType.Firebird]: exampleUISchema,
	[ServiceNodeType.SQLite]: exampleUISchema,
	[ServiceNodeType.Oracle]: exampleUISchema,
	//server js
	[ServiceNodeType.NestJs]: exampleUISchema,
	[ServiceNodeType.ExpressJs]: exampleUISchema,
	[ServiceNodeType.KoaJs]: exampleUISchema,
	[ServiceNodeType.HapiJs]: exampleUISchema,
	[ServiceNodeType.Fastify]: exampleUISchema,
	// server Python
	[ServiceNodeType.Litestar]: exampleUISchema,
	[ServiceNodeType.Django]: exampleUISchema,
	[ServiceNodeType.Flask]: exampleUISchema,
	[ServiceNodeType.FastAPI]: exampleUISchema,
};
