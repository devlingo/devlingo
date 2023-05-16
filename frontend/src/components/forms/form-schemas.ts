import { JsonSchema } from '@jsonforms/core';

import { NodeType } from '@/constants';

const exampleSchema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			minLength: 1,
		},
		description: {
			title: 'Long Description',
			type: 'string',
		},
		done: {
			type: 'boolean',
		},
		due_date: {
			type: 'string',
			format: 'date',
		},
		rating: {
			type: 'integer',
			maximum: 5,
		},
		recurrence: {
			type: 'string',
			enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
		},
		recurrence_interval: {
			type: 'integer',
		},
	},
	required: ['name', 'due_date'],
};

const nestJSServiceSchema: JsonSchema = exampleSchema;
const nextJSServiceSchema: JsonSchema = exampleSchema;

export const typeSchemaMap: Record<NodeType, JsonSchema> = {
	[NodeType.NestJs]: nestJSServiceSchema,
	[NodeType.NextJs]: nextJSServiceSchema,
};
