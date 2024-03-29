import { faker } from '@faker-js/faker';
import { act, renderHook } from 'tests/test-utils';

import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';
import { useContextMenuStore } from '@/stores/context-menu-store';

describe('contextMenuStore tests', () => {
	const nodeId = faker.string.uuid();
	const mouseEvent = {
		pageX: 100,
		pageY: 200,
		preventDefault: vi.fn(),
	};

	it('returns a callback function', () => {
		const { result } = renderHook(() =>
			useContextMenu(ContextMenuType.CustomNode, nodeId),
		);
		expect(typeof result.current).toBe('function');
	});

	it('sets the expected state when opening the context menu', () => {
		const { result } = renderHook(() =>
			useContextMenu(ContextMenuType.CustomNode, nodeId),
		);
		act(() => {
			result.current(mouseEvent);
		});
		const {
			result: { current: contextMenuData },
		} = renderHook(() => useContextMenuStore());

		expect(mouseEvent.preventDefault).toHaveBeenCalled();
		expect(contextMenuData.isContextMenuOpen).toBe(true);
		expect(contextMenuData.position.x).toBe(mouseEvent.pageX);
		expect(contextMenuData.position.y).toBe(mouseEvent.pageY);
		expect(contextMenuData.itemId).toBe(nodeId);
		expect(contextMenuData.menuType).toBe(ContextMenuType.CustomNode);
	});
});
