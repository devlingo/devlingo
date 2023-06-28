import { HttpMethod } from 'shared/constants';
import { DesignFactory } from 'shared/testing';
import { mockFetch } from 'tests/mocks';
import { expect } from 'vitest';

import { retrieveDesignById } from '@/api';

describe('designs api tests', () => {
	describe('retrieveDesignById tests', () => {
		it('returns a design', async () => {
			const design = await DesignFactory.build();

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(design),
			});

			const data = await retrieveDesignById({ designId: design.id });
			expect(data).toEqual(design);
			expect(mockFetch).toHaveBeenCalledWith(
				new URL(`http://www.example.com/v1/designs/${design.id}`),
				{
					headers: {
						'Authorization': 'Bearer test_token',
						'Content-Type': 'application/json',
						'X-Request-Id': 'uuidv4_value',
					},
					method: HttpMethod.Get,
				},
			);
		});
	});
});
