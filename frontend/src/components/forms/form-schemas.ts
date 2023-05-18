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
	[ServiceNodeType.NestJs]: nestJSServiceSchema,
	[ServiceNodeType.NextJs]: nextJSServiceSchema,
	[InternalNodeType.Service]: {},
	[InternalNodeType.Controller]: {},
	[InternalNodeType.Endpoint]: {},
};
