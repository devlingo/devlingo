import { getUserProfile } from '@/api/get-user-profile';
import { BACKEND_BASE_URL, GET_USER_PROFILE_PATH } from '@/constants';

describe('getUserProfile tests', () => {
	it('parses a response correctly', async () => {
		const token = 'valid_token';
		const expectedUser = {
			id: '1',
			firebaseId: 'firebase_id',
			email: 'test@test.com',
			name: 'Test User',
			avatarUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const mockResponse = {
			ok: true,
			json: vi.fn().mockResolvedValue(expectedUser),
		};
		const mockFetch = vi.fn().mockResolvedValue(mockResponse);
		global.fetch = mockFetch;

		const result = await getUserProfile(token);

		expect(mockFetch).toHaveBeenCalledWith(
			`${BACKEND_BASE_URL}/${GET_USER_PROFILE_PATH}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			},
		);
		expect(mockResponse.json).toHaveBeenCalled();
		expect(result).toEqual(expectedUser);
	});

	it('handles an error correctly', async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: false,
			json: vi
				.fn()
				.mockResolvedValue({ message: 'Internal server error' }),
		});

		await expect(getUserProfile('valid_token')).rejects.toThrow(
			'Internal server error',
		);
	});
});
