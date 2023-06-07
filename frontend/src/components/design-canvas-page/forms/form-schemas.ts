import { JsonSchema, UISchemaElement } from '@jsonforms/core';

import { ContainerNodeType, ServiceNodeType } from '@/constants';

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

export const DefaultSchemas = [NodeNameFormSchema, NodeNameFormUISchema];

export const NestControllerSchema = {
	type: 'object',
	properties: {
		nodeName: {
			type: 'string',
			minLength: 1,
		},
		path: {
			type: 'string',
			nullable: true,
		},
		endpoints: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						minLength: 1,
					},
					method: {
						type: 'string',
						enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
						default: 'GET',
					},
					path: {
						type: 'string',
						nullable: true,
					},
					statusCode: {
						type: 'number',
						default: 200,
					},
					parameters: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								name: {
									type: 'string',
									minLength: 1,
								},
								parameterType: {
									type: 'string',
									enum: [
										'PATH',
										'QUERY',
										'BODY',
										'HEADER',
										'COOKIE',
									],
									default: 'QUERY',
								},
								valueTypes: {
									type: 'string',
									enum: [
										'boolean',
										'data',
										'date-time',
										'duration',
										'email',
										'integer',
										'number',
										'string',
										'time',
										'uuid',
									],
									default: 'string',
								},
							},
						},
					},
				},
			},
		},
	},
	required: ['nodeName'],
};

export const NestControllerUISchema = {
	type: 'VerticalLayout',
	elements: [
		{
			type: 'Control',
			label: 'name',
			scope: '#/properties/nodeName',
		},
		{
			type: 'Control',
			scope: '#/properties/path',
		},
		{
			type: 'HorizontalLayout',
			elements: [
				{
					type: 'Control',
					scope: '#/properties/endpoints',
				},
			],
		},
	],
};

export const typeSchemaMap: Record<
	string,
	| [JsonSchema, UISchemaElement]
	| Record<string, [JsonSchema, UISchemaElement]>
> = {
	[ContainerNodeType.Module]: {
		[ServiceNodeType.NestJs]: [
			NestControllerSchema,
			NestControllerUISchema,
		],
	},
};
