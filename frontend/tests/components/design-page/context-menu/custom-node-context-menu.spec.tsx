import { faker } from '@faker-js/faker';
import { act, fireEvent, render, renderHook, screen } from 'tests/test-utils';
import { expect } from 'vitest';

import { ContextMenu } from '@/components/design-canvas-page/context-menu/context-menu';
import { CustomNodeContextMenu } from '@/components/design-canvas-page/context-menu/custom-node-context-menu';
import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';
import { useNodes, useSetNodes } from '@/stores/design-store';

describe('ServiceNodeContextMenu', () => {
	const nodeId = faker.string.uuid();
	const mouseEvent = {
		preventDefault: vi.fn(),
		pageX: 100,
		pageY: 200,
	};
	it('renders base context menu', () => {
		render(<CustomNodeContextMenu />);
		const serviceNodeMenu = screen.getByTestId('custom-node-context-menu');
		expect(serviceNodeMenu).toBeInTheDocument();
	});

	it('handles node deletion and closes context menu', () => {
		const { result } = renderHook(() =>
			useContextMenu(ContextMenuType.CustomNode, nodeId),
		);
		const { result: setNodesResult } = renderHook(() => useSetNodes());
		const { result: useNodesResult } = renderHook(() => useNodes());

		act(() => {
			result.current(mouseEvent);
			setNodesResult.current([{ id: nodeId }]);
		});

		render(<ContextMenu />);

		const deleteButton = screen.getByTestId('delete-node-context-item');
		fireEvent.click(deleteButton);

		expect(useNodesResult.current.length).toBe(0);
		expect(screen.queryByTestId('delete-node-context-item')).toBeNull();
	});
});
