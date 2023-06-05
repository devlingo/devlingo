import { Position } from '@reactflow/core';

import { positionHandle } from '@/utils/edge';

describe('edge util tests', () => {
	describe('positionHandle tests', () => {
		it('handles valid position value', () => {
			expect(positionHandle('id', Position.Top)).toBe('id-source-top');
			expect(positionHandle('id', Position.Bottom)).toBe(
				'id-source-bottom',
			);
			expect(positionHandle('id', Position.Left)).toBe('id-source-left');
			expect(positionHandle('id', Position.Right)).toBe(
				'id-source-right',
			);
		});

		it('formats id value correctly', () => {
			expect(positionHandle('id', 'id-source-top')).toBe('id-source-top');
			expect(positionHandle('id', 'id-source-bottom')).toBe(
				'id-source-bottom',
			);
			expect(positionHandle('id', 'id-source-left')).toBe(
				'id-source-left',
			);
			expect(positionHandle('id', 'id-source-right')).toBe(
				'id-source-right',
			);
		});

		it('throws for null value', () => {
			expect(() => positionHandle('id', null)).toThrowError(
				'unexpected edgeSource value null',
			);
		});

		it('throws for undefined value', () => {
			expect(() => positionHandle('id', undefined)).toThrowError(
				'unexpected edgeSource value undefined',
			);
		});

		it('throws for invalid edgeSource', () => {
			expect(() =>
				positionHandle('id', 'id-source-invalid'),
			).toThrowError('unexpected edgeSource value id-source-invalid');
		});
	});
});
