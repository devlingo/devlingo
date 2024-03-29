import { HttpMethod } from 'shared/constants';
import { UserFactory } from 'shared/testing';
import { mockFetch } from 'tests/mocks';

import { getUserProfile } from '@/api';

describe('users api tests', () => {
	describe('getUserProfile tests', () => {
		it('should return a user', async () => {
			const user = await UserFactory.build();
			mockFetch.mockResolvedValueOnce({
				json: () => Promise.resolve(user),
				ok: true,
			});

			const data = await getUserProfile();

			expect(data).toEqual(user);
			expect(mockFetch).toHaveBeenCalledWith(
				new URL(`http://www.example.com/v1/projects`),
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
