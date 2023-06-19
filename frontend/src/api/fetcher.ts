import { deepmerge } from 'deepmerge-ts';

import { HttpMethod } from '@/constants';
import { ApiParams } from '@/types';

export async function fetcher<T>({
	token,
	url,
	method,
	...rest
}: ApiParams): Promise<T> {
	if (!token) {
		throw new Error('No token provided');
	}
	if (!Object.values(HttpMethod).includes(method)) {
		throw new Error(`invalid HTTP method ${method}`);
	}

	const request = deepmerge(rest, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	}) satisfies RequestInit;
	const response = await fetch(
		new URL(url, process.env.NEXT_PUBLIC_BACKEND_BASE_URL),
		request,
	);
	const body = (await response.json()) as Record<string, any>;

	if (!response.ok) {
		throw new Error(
			(Reflect.get(body, 'message') ?? 'An API Error Occurred') as string,
		);
	}

	return body as T;
}
