import { act, renderHook } from 'tests/test-utils';

import { useBoundedDrop } from '@/hooks/use-bounded-drop';

describe('useBoundedDrop tests', () => {
	it('returns the expected values', () => {
		const { result } = renderHook(() => useBoundedDrop());
		expect(result.current.length).toBe(2);
	});

	it('handles initial null', () => {
		const { result } = renderHook(() => useBoundedDrop());
		expect(result.current[0]).toBeNull();
	});

	it('handles ref.current being null', () => {
		const { result } = renderHook(() => useBoundedDrop());
		const [, setRef] = result.current;
		act(() => {
			setRef(null);
		});
		expect(result.current[0]).toBeNull();
	});

	it('returns undefined for invalid drop', () => {
		const { result } = renderHook(() => useBoundedDrop());
		const [, setRef] = result.current;
		act(() => {
			setRef(document.createElement('div'));
		});
		const dropResult = result.current[1];
		const invalidDrop = { type: 'InvalidType' };
		act(() => {
			const result = dropResult(invalidDrop, {});
			expect(result).toBeUndefined();
		});
	});

	it('returns a ref function', () => {
		const { result } = renderHook(() => useBoundedDrop());
		const [, setRef] = result.current;
		act(() => {
			setRef(document.createElement('div'));
		});
		expect(typeof result.current[1]).toBe('function');
	});
});
