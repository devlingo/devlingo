import { act, renderHook } from 'tests/test-utils';

import { useWindowsDimensions } from '@/hooks/use-window-dimensions';

describe('useWindowsDimensions tests', () => {
	it('returns correct window dimensions', () => {
		const { result } = renderHook(() => useWindowsDimensions());
		expect(result.current).toEqual([window.innerHeight, window.innerWidth]);
	});

	it('handles resize', () => {
		const { result } = renderHook(() => useWindowsDimensions());
		act(() => {
			Reflect.set(window, 'innerWidth', 500);
			Reflect.set(window, 'innerHeight', 500);
			window.dispatchEvent(new Event('resize'));
		});
		expect(result.current).toEqual([500, 500]);
	});
});
