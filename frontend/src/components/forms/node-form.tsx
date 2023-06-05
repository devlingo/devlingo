import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { createAjv, JsonSchema, UISchemaElement } from '@jsonforms/core';
import {
	materialCells,
	materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { useState } from 'react';

import { DefaultSchemas, typeSchemaMap } from '@/components/forms/form-schemas';
import { useConfiguredNode, useUpdateNodeData } from '@/hooks/use-store';
import { FormData, NodeType } from '@/types';

const handleDefaultsAjv = createAjv({ useDefaults: true });
export interface NodeFormProps {
	closeMenuHandler: () => void;
}

export function NodeForm({ closeMenuHandler }: NodeFormProps) {
	const configuredNode = useConfiguredNode()!;
	const updateNodeData = useUpdateNodeData();

	const [formData, setFormData] = useState(configuredNode.data.formData);

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	let schemas = typeSchemaMap[configuredNode.type!] ?? DefaultSchemas;

	const parentNodeType = Reflect.get(
		configuredNode.data,
		'parentNodeType',
	) as string | undefined;

	if (parentNodeType && !Array.isArray(schemas)) {
		schemas = schemas[parentNodeType];
	}

	const [schema, uiSchema] = schemas as [JsonSchema, UISchemaElement];

	return (
		<div className="rounded h-fit w-6/12 m-auto p-4 bg-base-300 text-base-content border-2 border-accent overflow-scroll">
			<div
				data-testid={`node-form-${configuredNode.data.nodeType}`}
				className="p-2 "
			>
				<JsonForms
					ajv={handleDefaultsAjv}
					cells={materialCells}
					data={formData}
					onChange={({ data }) => {
						setFormData(data as FormData);
					}}
					renderers={materialRenderers}
					schema={schema}
					uischema={uiSchema}
				/>
			</div>
			<div className="flex justify-end">
				<div className="join join-horizontal">
					<button
						className="text-success"
						onClick={() =>
							updateNodeData(configuredNode.id, { formData })
						}
						data-testid={`node-form-save-button-${
							configuredNode.type as NodeType
						}`}
					>
						<CheckCircleIcon width={32} height={32} />
					</button>
					<button
						className="text-warning"
						onClick={closeMenuHandler}
						data-testid={`node-form-cancel-button-${
							configuredNode.type as NodeType
						}`}
					>
						<XCircleIcon width={32} height={32} />
					</button>
				</div>
			</div>
		</div>
	);
}
