import { faker } from '@faker-js/faker';
import { act, render, renderHook, screen } from 'tests/test-utils';
import { expect } from 'vitest';

import { ContextMenu } from '@/components/design-canvas-page/context-menu/context-menu';
import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';

describe('ContextMenu', () => {
	const nodeId = faker.string.uuid();
	const mouseEvent = {
		preventDefault: vi.fn(),
		pageX: 100,
		pageY: 200,
	};
	it('renders base context menu', () => {
		render(<ContextMenu />);
		const container = screen.getByTestId('context-menu-container');
		expect(container).toBeInTheDocument();
	});

	it('renders service node context menu', () => {
		const { result } = renderHook(() =>
			useContextMenu(ContextMenuType.CustomNode, nodeId),
		);
		act(() => {
			result.current(mouseEvent);
		});
		render(<ContextMenu />);

		const container = screen.getByTestId('context-menu-container');
		expect(container.style.left).includes(mouseEvent.pageX);
		expect(container.style.top).includes(mouseEvent.pageY);

		const serviceNodeMenu = screen.getByTestId('custom-node-context-menu');
		expect(serviceNodeMenu).toBeInTheDocument();
	});
});
