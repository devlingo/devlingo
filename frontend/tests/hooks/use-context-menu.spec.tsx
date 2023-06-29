import { act, renderHook } from 'tests/test-utils';

import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenu } from '@/hooks/use-context-menu';
import { useContextMenuStore } from '@/stores/context-menu-store';

describe('contextMenuStore tests', () => {
	const NODE_ID = 1;
	const mouseEvent = {
		preventDefault: vi.fn(),
		pageX: 100,
		pageY: 200,
	};
	it('returns a callback function', () => {
		const { result } = renderHook(() =>
			useContextMenu(ContextMenuType.CustomNode, NODE_ID),
		);
		expect(typeof result.current).toBe('function');
	});

	it('sets relevant values to open a context menu', () => {
		const { result } = renderHook(() =>
			useContextMenu(ContextMenuType.CustomNode, NODE_ID),
		);
		act(() => {
			result.current(mouseEvent);
		});
		const {
			result: { current: contextMenuData },
		} = renderHook(() => useContextMenuStore());

		expect(mouseEvent.preventDefault).toHaveBeenCalled();
		expect(contextMenuData.isClicked).toBe(true);
		expect(contextMenuData.position.x).toBe(mouseEvent.pageX);
		expect(contextMenuData.position.y).toBe(mouseEvent.pageY);
		expect(contextMenuData.nodeData).toBe(NODE_ID);
		expect(contextMenuData.menuType).toBe(ContextMenuType.CustomNode);
	});
});
