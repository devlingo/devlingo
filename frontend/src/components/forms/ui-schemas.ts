import { UISchemaElement } from '@jsonforms/core';

import { NodeType } from '@/constants';

const exampleUISchema = {
	type: 'VerticalLayout',
	elements: [
		{
			type: 'Control',
			label: 'Completed',
			scope: '#/properties/done',
		},
		{
			type: 'Control',
			scope: '#/properties/name',
		},
		{
			type: 'HorizontalLayout',
			elements: [
				{
					type: 'Control',
					scope: '#/properties/due_date',
				},
				{
					type: 'Control',
					scope: '#/properties/rating',
				},
			],
		},
		{
			type: 'HorizontalLayout',
			elements: [
				{
					type: 'Control',
					scope: '#/properties/recurrence',
				},
				{
					type: 'Control',
					scope: '#/properties/recurrence_interval',
					rule: {
						effect: 'HIDE',
						condition: {
							type: 'LEAF',
							scope: '#/properties/recurrence',
							expectedValue: 'Never',
						},
					},
				},
			],
		},
		{
			type: 'Control',
			scope: '#/properties/description',
			options: {
				multi: true,
			},
		},
	],
};

const nestJSServiceUISchema: UISchemaElement = exampleUISchema;
const nextJSServiceUISchema: UISchemaElement = exampleUISchema;

export const typeUISchemaMap: Record<NodeType, UISchemaElement> = {
	[NodeType.NestJs]: nestJSServiceUISchema,
	[NodeType.NextJs]: nextJSServiceUISchema,
};
