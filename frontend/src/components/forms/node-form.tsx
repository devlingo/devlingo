import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { createAjv, JsonSchema, UISchemaElement } from '@jsonforms/core';
import {
	materialCells,
	materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { useState } from 'react';

import { DefaultSchemas, typeSchemaMap } from '@/components/forms/form-schemas';
import { ServiceNodeType } from '@/constants';
import { FormData, NodeType } from '@/types';

const handleDefaultsAjv = createAjv({ useDefaults: true });
export interface NodeFormProps {
	formData: FormData;
	saveFormDataHandler: (formData: FormData) => void;
	closeMenuHandler: () => void;
	nodeType: NodeType;
	parentNodeType?: ServiceNodeType;
}

export function NodeForm({
	formData,
	saveFormDataHandler,
	closeMenuHandler,
	nodeType,
	parentNodeType,
}: NodeFormProps) {
	const [data, setData] = useState(formData);

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	let schemas = typeSchemaMap[nodeType] ?? DefaultSchemas;

	if (parentNodeType && !Array.isArray(schemas)) {
		schemas = schemas[parentNodeType];
	}

	const [schema, uiSchema] = schemas as [JsonSchema, UISchemaElement];

	return (
		<div className="rounded h-fit w-6/12 m-auto p-4 bg-base-300 text-base-content border-2 border-accent overflow-scroll">
			<div data-testid={`node-form-${nodeType}`} className="p-2 ">
				<JsonForms
					ajv={handleDefaultsAjv}
					cells={materialCells}
					data={data}
					onChange={({ data }) => {
						setData(data as FormData);
					}}
					renderers={materialRenderers}
					schema={schema}
					uischema={uiSchema}
				/>
			</div>
			<div className="flex justify-end">
				<div className="btn-group btn-group-horizontal">
					<button
						className="text-success"
						onClick={() => saveFormDataHandler(data)}
						data-testid={`node-form-save-button-${nodeType}`}
					>
						<CheckCircleIcon width={32} height={32} />
					</button>
					<button
						className="text-warning"
						onClick={closeMenuHandler}
						data-testid={`node-form-cancel-button-${nodeType}`}
					>
						<XCircleIcon width={32} height={32} />
					</button>
				</div>
			</div>
		</div>
	);
}
