import { render, screen } from 'tests/test-utils';

import { NodeForm } from '@/components/forms/node-form';
import { InternalNodeType, ServiceNodeType } from '@/constants';
import { NodeType } from '@/types';

describe('NodeForm tests', () => {
	it.each([
		...Object.values(ServiceNodeType),
		...Object.values(InternalNodeType),
	])('renders a form for %s node type', (nodeType: NodeType) => {
		render(
			<NodeForm
				formData={{ nodeName: 'test node name' }}
				closeMenuHandler={() => undefined}
				nodeType={nodeType}
				saveFormDataHandler={(_: any) => undefined}
				parentNodeType={ServiceNodeType.NestJs}
			/>,
		);
		expect(screen.getByTestId(`node-form-${nodeType}`)).toBeInTheDocument();
	});
	it('closes the menu when the cancel button is clicked', () => {
		const closeMenuHandler = vi.fn();
		const nodeType = ServiceNodeType.NextJs;
		render(
			<NodeForm
				formData={{ nodeName: 'test node name' }}
				closeMenuHandler={closeMenuHandler}
				nodeType={nodeType}
				saveFormDataHandler={(_: any) => undefined}
			/>,
		);
		expect(screen.getByTestId(`node-form-${nodeType}`)).toBeInTheDocument();
		expect(closeMenuHandler).not.toHaveBeenCalled();
		expect(
			screen.getByTestId(`node-form-cancel-button-${nodeType}`),
		).toBeInTheDocument();
		screen.getByTestId(`node-form-cancel-button-${nodeType}`).click();
		expect(closeMenuHandler).toHaveBeenCalled();
	});
	it('calls the saveFormDataHandler when the save button is clicked', () => {
		const saveFormDataHandler = vi.fn();
		const nodeType = ServiceNodeType.NextJs;
		render(
			<NodeForm
				formData={{ nodeName: 'test node name' }}
				closeMenuHandler={() => undefined}
				nodeType={nodeType}
				saveFormDataHandler={saveFormDataHandler}
			/>,
		);
		expect(screen.getByTestId(`node-form-${nodeType}`)).toBeInTheDocument();
		expect(saveFormDataHandler).not.toHaveBeenCalled();
		expect(
			screen.getByTestId(`node-form-save-button-${nodeType}`),
		).toBeInTheDocument();
		screen.getByTestId(`node-form-save-button-${nodeType}`).click();
		expect(saveFormDataHandler).toHaveBeenCalled();
	});
});
