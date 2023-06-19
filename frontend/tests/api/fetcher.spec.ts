import { mockFetch } from 'tests/mocks';

import { fetcher } from '@/api/fetcher';
import { HttpMethod } from '@/constants';

describe('api utils tests', () => {
	describe('fetcher tests', () => {
		it('handles a successful response correctly', async () => {
			const mockResponse = { data: 'mock data' };
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(mockResponse),
			});

			const result = await fetcher({
				token: 'valid_token',
				url: 'api',
				method: HttpMethod.Get,
			});

			expect(mockFetch).toHaveBeenCalledWith(
				new URL('http://www.example.com/api'),
				{
					method: HttpMethod.Get,
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer valid_token`,
					},
				},
			);
			expect(result).toEqual(mockResponse);
		});

		it('throws an error for an invalid token', async () => {
			global.fetch = vi.fn().mockResolvedValue({
				ok: false,
				json: () => Promise.resolve({}),
			});

			await expect(
				fetcher({
					// @ts-expect-error
					token: null,
					url: 'api',
					method: HttpMethod.Get,
				}),
			).rejects.toThrow('No token provided');
		});

		it('throws an error if the baseUrl is not provided', async () => {
			global.fetch = vi.fn().mockResolvedValue({
				ok: false,
				json: () => Promise.resolve({}),
			});

			delete process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

			await expect(
				fetcher({
					token: 'valid_token',
					url: 'api',
					method: HttpMethod.Get,
				}),
			).rejects.toThrow('Invalid URL');
		});

		it('test_api_call_with_invalid_http_method', async () => {
			global.fetch = vi.fn().mockResolvedValue({
				ok: false,
				json: () => Promise.resolve({}),
			});

			await expect(
				fetcher({
					token: 'valid_token',
					url: 'api',
					// @ts-expect-error
					method: 'INVALID',
				}),
			).rejects.toThrow('invalid HTTP method INVALID');
		});

		it('handles an error reponse correctly', async () => {
			const mockResponse = { message: 'API Error' };
			mockFetch.mockResolvedValueOnce({
				ok: false,
				json: () => Promise.resolve(mockResponse),
			});

			await expect(
				fetcher({
					token: 'valid_token',
					url: 'api',
					method: HttpMethod.Get,
					body: 'invalid_body',
				}),
			).rejects.toThrow('API Error');

			expect(mockFetch).toHaveBeenCalledWith(
				new URL('http://www.example.com/api'),
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer valid_token`,
					},
					body: 'invalid_body',
				},
			);
		});
	});
});
