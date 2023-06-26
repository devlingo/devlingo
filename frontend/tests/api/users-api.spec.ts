import { HttpMethod } from 'shared/constants';
import { UserFactory } from 'shared/testing';
import { mockFetch } from 'tests/mocks';

import { getUserProfile } from '@/api';
import { GET_USER_PROFILE_PATH } from '@/constants';

describe('users api tests', () => {
	describe('getUserProfile tests', () => {
		it('should return a user', async () => {
			const user = await UserFactory.build();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(user),
			});

			const data = await getUserProfile();

			expect(data).toEqual(user);
			expect(mockFetch).toHaveBeenCalledWith(
				new URL(`http://www.example.com/v1/${GET_USER_PROFILE_PATH}`),
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
