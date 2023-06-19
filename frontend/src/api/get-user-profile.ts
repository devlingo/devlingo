import { BACKEND_BASE_URL, GET_USER_PROFILE_PATH } from '@/constants';
import { ApiParams, User } from '@/types';

export async function getUserProfile({ token }: ApiParams): Promise<User> {
	const request = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	} satisfies RequestInit;
	const url = `${BACKEND_BASE_URL}/${GET_USER_PROFILE_PATH}`;
	const response = await fetch(url, request);
	const body = (await response.json()) as Record<string, any>;

	if (!response.ok) {
		throw new Error(
			(Reflect.get(body, 'message') ?? 'An API Error Occurred') as string,
		);
	}

	return body as User;
}
