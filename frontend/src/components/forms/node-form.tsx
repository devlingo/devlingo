import 'tailwindcss/tailwind.css';

import { JsonForms } from '@jsonforms/react';
import {
	JsonFormsStyleContext,
	vanillaCells,
	vanillaRenderers,
	vanillaStyles,
} from '@jsonforms/vanilla-renderers';
import { StyleDef } from '@jsonforms/vanilla-renderers/src/styles/styles';
import React, { useState } from 'react';

import { typeSchemaMap } from '@/components/forms/form-schemas';
import { typeUISchemaMap } from '@/components/forms/ui-schemas';
import { NodeType } from '@/constants';

// see: https://github.com/eclipsesource/jsonforms/blob/b11f04c87adf7d1ecf90ed72b929cf54e3266e39/packages/vanilla-renderers/src/styles/styles.ts#L39
// for all the vanilla styles
const styles: StyleDef[] = [
	...vanillaStyles,
	{
		name: 'control.input',
		classNames: ['input input-bordered input-sm w-full max-w-xs'],
	},
	{
		name: 'control.label',
		classNames: ['text-neutral-content text-sm pr-2'],
	},
	{
		name: 'control.select',
		classNames: ['select select-sm w-full max-w-xs'],
	},
	{
		name: 'control.radio',
		classNames: ['radio radio-primary radio-sm'],
	},
];

export interface NodeFormProps {
	formData?: Record<string, any>;
	nodeType: NodeType;
}

export function NodeForm({ formData, nodeType }: NodeFormProps) {
	const [data, setData] = useState(formData ?? {});

	return (
		<div className="rounded m-auto p-4 bg-gray-500">
			<JsonFormsStyleContext.Provider value={{ styles }}>
				<JsonForms
					schema={typeSchemaMap[nodeType]}
					uischema={typeUISchemaMap[nodeType]}
					data={data}
					renderers={vanillaRenderers}
					cells={vanillaCells}
					onChange={({ data }) => {
						setData(data as Record<string, any>);
					}}
				/>
			</JsonFormsStyleContext.Provider>
		</div>
	);
}
