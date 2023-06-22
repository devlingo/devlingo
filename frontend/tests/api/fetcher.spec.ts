import { mockFetch } from 'tests/mocks';

import { fetcher } from '@/api';
import { HttpMethod } from '@/constants';
import { ApiError, ConfigurationError, TokenError } from '@/errors';

describe('fetcher tests', () => {
	// Tests that a successful API call is made with valid token and HTTP method
	it('test_successful_api_call', async () => {
		const mockResponse = { data: 'success' };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: () => Promise.resolve(mockResponse),
		});
		global.fetch = mockFetch;

		const result = await fetcher({ url: 'test', method: HttpMethod.Get });

		expect(mockFetch).toHaveBeenCalledWith(
			'http://www.example.com/v1/test',
			{
				method: HttpMethod.Get,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': expect.any(String),
					'X-Request-Id': expect.any(String),
				},
			},
		);
		expect(result).toEqual(mockResponse);
	});

	// Tests that a successful API call with empty response (status 204) is handled
	it('test_empty_response', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			status: 204,
		});
		global.fetch = mockFetch;

		const result = await fetcher({ url: 'test', method: HttpMethod.Get });

		expect(mockFetch).toHaveBeenCalledWith(
			'http://www.example.com/v1/test',
			{
				method: HttpMethod.Get,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': expect.any(String),
					'X-Request-Id': expect.any(String),
				},
			},
		);
		expect(result).toEqual({});
	});

	// Tests that an error is thrown when an invalid HTTP method is provided
	it('test_invalid_http_method', async () => {
		await expect(
			// @ts-expect-error
			fetcher({ url: 'test', method: 'INVALID' }),
		).rejects.toThrow(ConfigurationError);
	});

	// Tests that an error is thrown when the user is not logged in
	it('test_user_not_logged_in', async () => {
		const mockAuth = {
			currentUser: null,
		};
		// @ts-expect-error
		vi.spyOn(global, 'getFirebaseAuth').mockResolvedValueOnce(
			mockAuth as any,
		);

		await expect(
			fetcher({ url: 'test', method: HttpMethod.Get }),
		).rejects.toThrow(TokenError);
	});

	// Tests that an ApiError is thrown with relevant information on non-200 status code
	it('test_non_200_status_code', async () => {
		const mockResponse = { message: 'error' };
		mockFetch.mockResolvedValueOnce({
			ok: false,
			status: 400,
			statusText: 'Bad Request',
			json: () => Promise.resolve(mockResponse),
		});
		global.fetch = mockFetch;

		await expect(
			fetcher({ url: 'test', method: HttpMethod.Get }),
		).rejects.toThrow(ApiError);
		expect(mockFetch).toHaveBeenCalledWith(
			'http://www.example.com/v1/test',
			{
				method: HttpMethod.Get,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': expect.any(String),
					'X-Request-Id': expect.any(String),
				},
			},
		);
	});

	// Tests that request headers include Content-Type, Authorization, and X-Request-Id
	it('test_request_headers', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: () => Promise.resolve({}),
		});
		global.fetch = mockFetch;

		await fetcher({ url: 'test', method: HttpMethod.Get });

		expect(mockFetch).toHaveBeenCalledWith(
			'http://www.example.com/v1/test',
			{
				method: HttpMethod.Get,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': expect.any(String),
					'X-Request-Id': expect.any(String),
				},
			},
		);
	});

	// Tests that request URL includes version and base URL
	it('test_request_url', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: () => Promise.resolve({}),
		});
		global.fetch = mockFetch;

		await fetcher({ url: 'test', method: HttpMethod.Get });

		expect(mockFetch).toHaveBeenCalledWith(
			'http://www.example.com/v1/test',
			expect.any(Object),
		);
	});

	// Tests that response body is parsed as JSON
	it('test_response_body', async () => {
		const mockResponse = { data: 'success' };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: () => Promise.resolve(mockResponse),
		});
		global.fetch = mockFetch;

		const result = await fetcher({ url: 'test', method: HttpMethod.Get });

		expect(result).toEqual(mockResponse);
	});
});
