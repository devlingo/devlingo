import { JsonSchema } from '@jsonforms/core';

import { InternalNodeType, ServiceNodeType } from '@/constants';
import { NodeType } from '@/types';

const exampleSchema = {
	type: 'object',
	properties: {
		nodeName: {
			type: 'string',
			minLength: 1,
		},
	},
	required: ['nodeName'],
};

const nestJSServiceSchema: JsonSchema = exampleSchema;
const nextJSServiceSchema: JsonSchema = exampleSchema;

export const typeSchemaMap: Record<NodeType, JsonSchema> = {
	// frontend frameworks
	[ServiceNodeType.NextJs]: nextJSServiceSchema,
	// db nosql
	[ServiceNodeType.MongoDB]: exampleSchema,
	[ServiceNodeType.Firestore]: exampleSchema,
	[ServiceNodeType.Cassandra]: exampleSchema,
	[ServiceNodeType.DynamoDB]: exampleSchema,
	[ServiceNodeType.Redis]: exampleSchema,
	[ServiceNodeType.Hbase]: exampleSchema,
	[ServiceNodeType.CosmosDB]: exampleSchema,
	// db sql
	[ServiceNodeType.MySQL]: exampleSchema,
	[ServiceNodeType.PostgresSQL]: exampleSchema,
	[ServiceNodeType.MicrosoftSQL]: exampleSchema,
	[ServiceNodeType.MariaDB]: exampleSchema,
	[ServiceNodeType.Firebird]: exampleSchema,
	[ServiceNodeType.SQLite]: exampleSchema,
	[ServiceNodeType.Oracle]: exampleSchema,
	// server js
	[ServiceNodeType.ExpressJs]: exampleSchema,
	[ServiceNodeType.Fastify]: exampleSchema,
	[ServiceNodeType.HapiJs]: exampleSchema,
	[ServiceNodeType.KoaJs]: exampleSchema,
	[ServiceNodeType.NestJs]: nestJSServiceSchema,
	// server py
	[ServiceNodeType.Litestar]: exampleSchema,
	[ServiceNodeType.Django]: exampleSchema,
	[ServiceNodeType.Flask]: exampleSchema,
	[ServiceNodeType.FastAPI]: exampleSchema,
	// internal nodes
	[InternalNodeType.Controller]: {},
	[InternalNodeType.Endpoint]: {},
	[InternalNodeType.Module]: {},
	[InternalNodeType.Service]: {},
};
