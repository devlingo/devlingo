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
		<div className="rounded m-auto p-4 bg-base-100 text-base-content">
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
			<div className="flex justify-end">
				<div className="btn-group btn-group-horizontal">
					<button className="text-success">
						<CheckCircleIcon
							width={32}
							height={32}
							onClick={() => saveFormDataHandler(data)}
						/>
					</button>
					<button className="text-warning">
						<XCircleIcon
							width={32}
							height={32}
							onClick={closeMenuHandler}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}
