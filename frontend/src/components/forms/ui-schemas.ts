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
};
