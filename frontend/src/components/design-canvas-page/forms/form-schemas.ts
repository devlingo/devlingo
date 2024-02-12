import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { ServiceType, SystemComponentType } from 'shared/constants';

export const NodeNameFormSchema = {
	properties: {
		nodeName: {
			minLength: 1,
			type: 'string',
		},
	},
	required: ['nodeName'],
	type: 'object',
};

export const NodeNameFormUISchema = {
	elements: [
		{
			label: 'name',
			scope: '#/properties/nodeName',
			type: 'Control',
		},
	],
	type: 'VerticalLayout',
};

export const DefaultSchemas = [NodeNameFormSchema, NodeNameFormUISchema];

export const NestControllerSchema = {
	properties: {
		endpoints: {
			items: {
				properties: {
					method: {
						default: 'GET',
						enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
						type: 'string',
					},
					name: {
						minLength: 1,
						type: 'string',
					},
					parameters: {
						items: {
							properties: {
								name: {
									minLength: 1,
									type: 'string',
								},
								parameterType: {
									default: 'QUERY',
									enum: [
										'PATH',
										'QUERY',
										'BODY',
										'HEADER',
										'COOKIE',
									],
									type: 'string',
								},
								valueTypes: {
									default: 'string',
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
									type: 'string',
								},
							},
							type: 'object',
						},
						type: 'array',
					},
					path: {
						nullable: true,
						type: 'string',
					},
					statusCode: {
						default: 200,
						type: 'number',
					},
				},
				type: 'object',
			},
			type: 'array',
		},
		nodeName: {
			minLength: 1,
			type: 'string',
		},
		path: {
			nullable: true,
			type: 'string',
		},
	},
	required: ['nodeName'],
	type: 'object',
};

export const NestControllerUISchema = {
	elements: [
		{
			label: 'name',
			scope: '#/properties/nodeName',
			type: 'Control',
		},
		{
			scope: '#/properties/path',
			type: 'Control',
		},
		{
			elements: [
				{
					scope: '#/properties/endpoints',
					type: 'Control',
				},
			],
			type: 'HorizontalLayout',
		},
	],
	type: 'VerticalLayout',
};

export const typeSchemaMap: Record<
	string,
	| [JsonSchema, UISchemaElement]
	| Record<string, [JsonSchema, UISchemaElement]>
> = {
	[SystemComponentType.Module]: {
		[ServiceType.NestJs]: [NestControllerSchema, NestControllerUISchema],
	},
};
