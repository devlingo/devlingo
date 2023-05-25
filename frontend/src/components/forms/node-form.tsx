import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import {
	materialCells,
	materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { useState } from 'react';

import { typeSchemaMap } from '@/components/forms/form-schemas';
import { typeUISchemaMap } from '@/components/forms/ui-schemas';
import { FormData, NodeType } from '@/types';

export interface NodeFormProps {
	formData: FormData;
	saveFormDataHandler: (formData: FormData) => void;
	closeMenuHandler: () => void;
	nodeType: NodeType;
}

export function NodeForm({
	formData,
	saveFormDataHandler,
	closeMenuHandler,
	nodeType,
}: NodeFormProps) {
	const [data, setData] = useState(formData);

	return (
		<div className="rounded h-fit w-fit m-auto p-4 bg-base-300 text-base-content border-2 border-accent">
			<div data-testid={`node-form-${nodeType}`} className="p-2">
				<JsonForms
					schema={typeSchemaMap[nodeType]}
					uischema={typeUISchemaMap[nodeType]}
					data={data}
					renderers={materialRenderers}
					cells={materialCells}
					onChange={({ data }) => {
						setData(data as FormData);
					}}
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
