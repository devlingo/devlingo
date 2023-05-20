import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import {
	materialCells,
	materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import { typeSchemaMap } from '@/components/forms/form-schemas';
import { typeUISchemaMap } from '@/components/forms/ui-schemas';
import { NodeType } from '@/types';

export interface NodeFormProps {
	formData: Record<string, any>;
	nodeType: NodeType;
	saveFormDataHandler: (formData: Record<string, any>) => void;
	closeMenuHandler: () => void;
}

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export function NodeForm({
	formData,
	nodeType,
	saveFormDataHandler,
	closeMenuHandler,
}: NodeFormProps) {
	const [data, setData] = useState(formData);

	return (
		<div className="rounded m-auto p-4 bg-base-100 text-base-content">
			<ThemeProvider theme={darkTheme}>
				<JsonForms
					schema={typeSchemaMap[nodeType]}
					uischema={typeUISchemaMap[nodeType]}
					data={data}
					renderers={materialRenderers}
					cells={materialCells}
					onChange={({ data }) => {
						setData(data as Record<string, any>);
					}}
				/>
			</ThemeProvider>
			<div className="button-group btn-group-horizontal">
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
	);
}
