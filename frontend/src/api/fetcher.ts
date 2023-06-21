import { deepmerge } from 'deepmerge-ts';

import { HttpMethod } from '@/constants';
import { ApiError, ConfigurationError, TokenError } from '@/errors';
import { ApiParams } from '@/types';

export async function fetcher<T>({
	token,
	url,
	method,
	version = 1,
	...rest
}: ApiParams): Promise<T> {
	if (!token) {
		throw new TokenError('No token provided');
	}
	if (!Object.values(HttpMethod).includes(method)) {
		throw new ConfigurationError(`invalid HTTP method ${method}`);
	}

	const request = deepmerge(rest, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	}) satisfies RequestInit;

	const path = new URL(
		`v${version}/${url}`,
		process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
	);

	const response = await fetch(path, request);
	const body = (await response.json()) as Record<string, any>;

	if (!response.ok) {
		throw new ApiError(
			(Reflect.get(body, 'message') ?? 'An API Error Occurred') as string,
			{
				statusCode: response.status,
				statusText: response.statusText,
				context: { path },
			},
		);
	}

	return body as T;
}
