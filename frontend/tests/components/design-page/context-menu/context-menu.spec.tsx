import { NodeFactory } from 'shared/testing';
import { act, fireEvent, render, renderHook, screen } from 'tests/test-utils';
import { beforeEach, expect } from 'vitest';
import { mockReset } from 'vitest-mock-extended';

import { ContextMenu } from '@/components/design-canvas-page/context-menu/context-menu';
import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';
import { useNodes, useSetNodes } from '@/stores/design-store';

describe('ContextMenu tests', () => {
	const preventDefaultMock = vi.fn();
	const mouseEvent = {
		preventDefault: preventDefaultMock,
		pageX: 100,
		pageY: 200,
	};
	beforeEach(() => {
		mockReset(preventDefaultMock);
	});

	it('renders base context menu', () => {
		render(<ContextMenu />);
		const container = screen.getByTestId('context-menu-container');
		expect(container).toBeInTheDocument();
	});

	describe('NodeContextMenu Tests', () => {
		it('renders the node context menu', async () => {
			const node = await NodeFactory.build();
			const { result } = renderHook(() =>
				useContextMenu(ContextMenuType.CustomNode, node.id),
			);
			act(() => {
				result.current(mouseEvent);
			});
			render(<ContextMenu />);

			const container = screen.getByTestId('context-menu-container');
			expect(container.style.left).includes(mouseEvent.pageX);
			expect(container.style.top).includes(mouseEvent.pageY);

			const serviceNodeMenu = screen.getByTestId(
				'custom-node-context-menu',
			);
			expect(serviceNodeMenu).toBeInTheDocument();
		});

		describe('delete node button tests', () => {
			it('deletes the node and closes the context menu', async () => {
				const node = await NodeFactory.build();

				const { result } = renderHook(() =>
					useContextMenu(ContextMenuType.CustomNode, node.id),
				);
				const { result: setNodesResult } = renderHook(() =>
					useSetNodes(),
				);
				const { result: useNodesResult } = renderHook(() => useNodes());

				act(() => {
					setNodesResult.current([node]);
					result.current(mouseEvent);
				});

				expect(preventDefaultMock).toHaveBeenCalled();

				render(<ContextMenu />);
				expect(useNodesResult.current).toHaveLength(1);

				const deleteButton = screen.getByTestId(
					'context-menu-delete-node-btn',
				);
				fireEvent.click(deleteButton);

				expect(useNodesResult.current).toHaveLength(0);
				expect(
					screen.queryByTestId('delete-node-context-item'),
				).toBeNull();
			});
		});
	});
});
