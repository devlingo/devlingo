import { renderHook } from 'tests/test-utils';

import { useIsClientSide } from '@/hooks/use-is-client-side';

describe('useIsClientSide tests', () => {
	it('sets true when window is defined', () => {
		const { result } = renderHook(() => useIsClientSide());
		expect(result.current).toBe(true);
	});
});
