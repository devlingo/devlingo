import { HttpMethod } from 'shared/constants';
import { DesignFactory, VersionFactory } from 'shared/testing';
import { mockFetch } from 'tests/mocks';
import { expect } from 'vitest';

import { retrieveDesignById } from '@/api';

describe('versions api tests', () => {
	describe('retrieveVersionById tests', () => {
		it('returns a version', async () => {
			const design = await DesignFactory.build();
			const version = await VersionFactory.build({ designId: design.id });

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(version),
			});

			const data = await retrieveDesignById({ designId: design.id });
			expect(data).toEqual(version);
			expect(mockFetch).toHaveBeenCalledWith(
				new URL(
					`http://www.example.com/v1/${design.projectId}/${design.id}/versions/${version.id}`,
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
