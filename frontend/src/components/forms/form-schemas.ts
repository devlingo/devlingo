import { JsonSchema } from '@jsonforms/core';

import { InternalNodeType, ServiceNodeType } from '@/constants';
import { NodeType } from '@/types';

export const NodeNameFormSchema = {
	type: 'object',
	properties: {
		nodeName: {
			type: 'string',
			minLength: 1,
		},
	},
	required: ['nodeName'],
};

const nestJSServiceSchema: JsonSchema = NodeNameFormSchema;
const nextJSServiceSchema: JsonSchema = NodeNameFormSchema;

export const typeSchemaMap: Record<NodeType, JsonSchema> = {
	// frontend frameworks
	[ServiceNodeType.NextJs]: nextJSServiceSchema,
	// db nosql
	[ServiceNodeType.MongoDB]: NodeNameFormSchema,
	[ServiceNodeType.Firestore]: NodeNameFormSchema,
	[ServiceNodeType.Cassandra]: NodeNameFormSchema,
	[ServiceNodeType.DynamoDB]: NodeNameFormSchema,
	[ServiceNodeType.Redis]: NodeNameFormSchema,
	[ServiceNodeType.Hbase]: NodeNameFormSchema,
	[ServiceNodeType.CosmosDB]: NodeNameFormSchema,
	// db sql
	[ServiceNodeType.MySQL]: NodeNameFormSchema,
	[ServiceNodeType.PostgresSQL]: NodeNameFormSchema,
	[ServiceNodeType.MicrosoftSQL]: NodeNameFormSchema,
	[ServiceNodeType.MariaDB]: NodeNameFormSchema,
	[ServiceNodeType.Firebird]: NodeNameFormSchema,
	[ServiceNodeType.SQLite]: NodeNameFormSchema,
	[ServiceNodeType.Oracle]: NodeNameFormSchema,
	// server js
	[ServiceNodeType.ExpressJs]: NodeNameFormSchema,
	[ServiceNodeType.Fastify]: NodeNameFormSchema,
	[ServiceNodeType.HapiJs]: NodeNameFormSchema,
	[ServiceNodeType.KoaJs]: NodeNameFormSchema,
	[ServiceNodeType.NestJs]: nestJSServiceSchema,
	// server py
	[ServiceNodeType.Litestar]: NodeNameFormSchema,
	[ServiceNodeType.Django]: NodeNameFormSchema,
	[ServiceNodeType.Flask]: NodeNameFormSchema,
	[ServiceNodeType.FastAPI]: NodeNameFormSchema,
	// internal nodes
	[InternalNodeType.Controller]: NodeNameFormSchema,
	[InternalNodeType.Endpoint]: NodeNameFormSchema,
	[InternalNodeType.Module]: NodeNameFormSchema,
	[InternalNodeType.Service]: NodeNameFormSchema,
};
