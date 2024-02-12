import { Position } from '@reactflow/core';

import { positionHandle } from '@/utils/edge';

describe('positionHandle tests', () => {
	it('handles horizontal alignment', () => {
		const sourcePosition = { x: 0, y: 0 };
		const targetPosition = { x: 10, y: 0 };
		const expected = {
			sourceHandle: Position.Right,
			targetHandle: Position.Left,
		};
		const result = positionHandle({ sourcePosition, targetPosition });
		expect(result).toEqual(expected);
	});

	it('handles vertical alignment', () => {
		const sourcePosition = { x: 0, y: 0 };
		const targetPosition = { x: 0, y: 10 };
		const expected = {
			sourceHandle: Position.Bottom,
			targetHandle: Position.Top,
		};
		const result = positionHandle({ sourcePosition, targetPosition });
		expect(result).toEqual(expected);
	});

	it('handles identical position', () => {
		const sourcePosition = { x: 0, y: 0 };
		const targetPosition = { x: 0, y: 0 };
		const expected = {
			sourceHandle: Position.Top,
			targetHandle: Position.Bottom,
		};
		const result = positionHandle({ sourcePosition, targetPosition });
		expect(result).toEqual(expected);
	});

	// Tests that the function returns the correct target and source handle positions when the source and target positions are very close to each other.
	it('test_very_close_positions', () => {
		const sourcePosition = { x: 0, y: 0 };
		const targetPosition = { x: 1, y: 0 };
		const expected = {
			sourceHandle: Position.Right,
			targetHandle: Position.Left,
		};
		const result = positionHandle({ sourcePosition, targetPosition });
		expect(result).toEqual(expected);
	});

	// Tests that the function handles negative coordinates correctly.
	it('test_negative_coordinates', () => {
		const sourcePosition = { x: -10, y: -10 };
		const targetPosition = { x: -5, y: -10 };
		const expected = {
			sourceHandle: Position.Right,
			targetHandle: Position.Left,
		};
		const result = positionHandle({ sourcePosition, targetPosition });
		expect(result).toEqual(expected);
	});

	it('handles floats', () => {
		const sourcePosition = { x: 0.5, y: 0.5 };
		const targetPosition = { x: 10.5, y: 0.5 };
		const expected = {
			sourceHandle: Position.Right,
			targetHandle: Position.Left,
		};
		const result = positionHandle({ sourcePosition, targetPosition });
		expect(result).toEqual(expected);
	});

	it('handles negative values', () => {
		const sourcePosition = { x: 0, y: 0 };
		const targetPosition = { x: 0, y: -10 };
		const expected = {
			sourceHandle: Position.Top,
			targetHandle: Position.Bottom,
		};
		const result = positionHandle({ sourcePosition, targetPosition });
		expect(result).toEqual(expected);
	});

	// Tests that the function returns the correct target and source handle positions when the target is below and aligned with the source.
	it('test_below_aligned', () => {
		const sourcePosition = { x: 0, y: 0 };
		const targetPosition = { x: 0, y: 10 };
		const expected = {
			sourceHandle: Position.Bottom,
			targetHandle: Position.Top,
		};
		const result = positionHandle({ sourcePosition, targetPosition });
		expect(result).toEqual(expected);
	});
});
