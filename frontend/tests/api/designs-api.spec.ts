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
				json: () => Promise.resolve(design),
				ok: true,
			});

			const data = await retrieveDesignById({
				designId: design.id,
				projectId: design.projectId,
			});
			expect(data).toEqual(design);
			expect(mockFetch).toHaveBeenCalledWith(
				new URL(
					`http://www.example.com/v1/${design.projectId}/designs/${design.id}`,
				),
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
