import { TimeUnit } from 'shared/constants';
import { DesignFactory } from 'shared/testing';
import { DesignResponseData } from 'shared/types';
import { mockFetch } from 'tests/mocks';
import { act, renderHook, waitFor } from 'tests/test-utils';
import { afterAll, beforeEach } from 'vitest';
import { mockReset } from 'vitest-mock-extended';

import { useSaveDesign } from '@/hooks/use-save-design';

describe('useSaveDesign tests', () => {
	const currentDesign = {
		...DesignFactory.buildSync(),
		versions: [],
	} satisfies DesignResponseData;

	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	beforeEach(() => {
		mockReset(mockFetch);
	});

	it('initializes with the expected state', () => {
		const { result } = renderHook(() =>
			useSaveDesign({
				currentDesign,
				debounceThreshold: TimeUnit.OneSecondInMilliseconds,
				edges: [],
				nodes: [],
				saveCheckInterval: TimeUnit.OneSecondInMilliseconds,
				saveDelay: TimeUnit.OneSecondInMilliseconds,
				viewport: {
					x: 0,
					y: 0,
					zoom: 1,
				},
			}),
		);

		expect(result.current.isSaving).toBe(false);
		expect(result.current.setLastChangeTimestamp).toBeInstanceOf(Function);
	});

	it('saves a design when debounce threshold is exceeded', async () => {
		mockFetch.mockResolvedValueOnce({
			json: () => Promise.resolve({}),
			ok: true,
			status: 201,
		});

		const { result, rerender } = renderHook(() =>
			useSaveDesign({
				currentDesign,
				debounceThreshold: TimeUnit.OneSecondInMilliseconds,
				edges: [],
				nodes: [],
				saveCheckInterval: TimeUnit.OneSecondInMilliseconds,
				saveDelay: TimeUnit.OneSecondInMilliseconds,
				viewport: {
					x: 0,
					y: 0,
					zoom: 1,
				},
			}),
		);

		act(() => {
			result.current.setLastChangeTimestamp(Date.now());
		});

		act(() => {
			vi.advanceTimersByTime(TimeUnit.OneSecondInMilliseconds * 2);
		});
		rerender();
		expect(result.current.isSaving).toBeTruthy();

		act(() => {
			vi.runAllTimersAsync();
		});

		await waitFor(() => {
			expect(mockFetch).toHaveBeenCalled();
		});
	});

	it('delays setting "isSaving" to "false" by the given delay', async () => {
		mockFetch.mockResolvedValueOnce({
			json: () => Promise.resolve({}),
			ok: true,
			status: 201,
		});

		const { result, rerender } = renderHook(() =>
			useSaveDesign({
				currentDesign,
				debounceThreshold: TimeUnit.OneSecondInMilliseconds,
				edges: [],
				nodes: [],
				saveCheckInterval: TimeUnit.OneSecondInMilliseconds,
				saveDelay: TimeUnit.OneSecondInMilliseconds,
				viewport: {
					x: 0,
					y: 0,
					zoom: 1,
				},
			}),
		);

		expect(result.current.isSaving).toBeFalsy();
		act(() => {
			result.current.setLastChangeTimestamp(Date.now());
		});
		rerender();
		expect(result.current.isSaving).toBeFalsy();

		act(() => {
			vi.advanceTimersByTime(TimeUnit.OneSecondInMilliseconds * 2);
		});
		rerender();
		expect(result.current.isSaving).toBeTruthy();

		act(() => {
			vi.advanceTimersByTimeAsync(TimeUnit.OneSecondInMilliseconds * 2);
		});

		rerender();
		await waitFor(() => {
			expect(result.current.isSaving).toBeFalsy();
		});
	});

	it('does not save when saving is in progress', async () => {
		const { result, rerender } = renderHook(() =>
			useSaveDesign({
				currentDesign,
				debounceThreshold: TimeUnit.OneSecondInMilliseconds,
				edges: [],
				nodes: [],
				saveCheckInterval: TimeUnit.OneSecondInMilliseconds,
				saveDelay: TimeUnit.OneSecondInMilliseconds,
				viewport: {
					x: 0,
					y: 0,
					zoom: 1,
				},
			}),
		);

		act(() => {
			result.current.setLastChangeTimestamp(Date.now());
			result.current.isSaving = true;
		});

		act(() => {
			vi.advanceTimersByTime(TimeUnit.OneSecondInMilliseconds * 2);
		});
		rerender();
		expect(result.current.isSaving).toBeTruthy();

		act(() => {
			vi.runAllTimersAsync();
		});

		await waitFor(() => {
			expect(mockFetch).not.toHaveBeenCalled();
		});
		expect(result.current.error).toBeNull();
	});

	it('does not save if "lastChangeTimestamp" is "null"', async () => {
		const { result, rerender } = renderHook(() =>
			useSaveDesign({
				currentDesign,
				debounceThreshold: TimeUnit.OneSecondInMilliseconds,
				edges: [],
				nodes: [],
				saveCheckInterval: TimeUnit.OneSecondInMilliseconds,
				saveDelay: TimeUnit.OneSecondInMilliseconds,
				viewport: {
					x: 0,
					y: 0,
					zoom: 1,
				},
			}),
		);

		act(() => {
			result.current.setLastChangeTimestamp(null);
			result.current.isSaving = true;
		});

		act(() => {
			vi.advanceTimersByTime(TimeUnit.OneSecondInMilliseconds * 2);
		});
		rerender();
		expect(result.current.isSaving).toBeFalsy();

		act(() => {
			vi.runAllTimersAsync();
		});

		await waitFor(() => {
			expect(mockFetch).not.toHaveBeenCalled();
		});
		expect(result.current.error).toBeNull();
	});

	it('does not save if "debounceThreshold" is not exceeded', async () => {
		mockFetch.mockResolvedValueOnce({
			json: () => Promise.resolve({}),
			ok: true,
			status: 201,
		});

		const { result, rerender } = renderHook(() =>
			useSaveDesign({
				currentDesign,
				debounceThreshold: TimeUnit.OneSecondInMilliseconds,
				edges: [],
				nodes: [],
				saveCheckInterval: TimeUnit.OneSecondInMilliseconds,
				saveDelay: TimeUnit.OneSecondInMilliseconds,
				viewport: {
					x: 0,
					y: 0,
					zoom: 1,
				},
			}),
		);

		act(() => {
			result.current.setLastChangeTimestamp(Date.now());
		});

		act(() => {
			vi.advanceTimersByTime(TimeUnit.OneSecondInMilliseconds / 2);
		});
		rerender();
		expect(result.current.isSaving).toBeFalsy();

		await waitFor(() => {
			expect(mockFetch).not.toHaveBeenCalled();
		});

		expect(result.current.error).toBeNull();
	});

	it('returns an error if an error is thrown', async () => {
		mockFetch.mockResolvedValueOnce({
			json: () => Promise.resolve({ message: 'oops' }),
			ok: false,
			status: 400,
		});

		const { result, rerender } = renderHook(() =>
			useSaveDesign({
				currentDesign,
				debounceThreshold: TimeUnit.OneSecondInMilliseconds,
				edges: [],
				nodes: [],
				saveCheckInterval: TimeUnit.OneSecondInMilliseconds,
				saveDelay: TimeUnit.OneSecondInMilliseconds,
				viewport: {
					x: 0,
					y: 0,
					zoom: 1,
				},
			}),
		);

		act(() => {
			result.current.setLastChangeTimestamp(Date.now());
		});

		act(() => {
			vi.advanceTimersByTime(TimeUnit.OneSecondInMilliseconds * 2);
		});
		rerender();

		await waitFor(() => {
			expect(result.current.error).not.toBeNull();
		});
	});
});
