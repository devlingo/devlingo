import useSWR from 'swr';

import { BACKEND_BASE_URL } from '@/constants';
import { User } from '@/types/api-types';

export const getUserProfilePath = 'users/profile';

export async function getUserProfile(token: string): Promise<User> {
	const request = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	} satisfies RequestInit;
	const url = `${BACKEND_BASE_URL}/${getUserProfilePath}`;
	const response = await fetch(url, request);
	const body = (await response.json()) as Record<string, any>;

	if (!response.ok) {
		throw new Error(
			(Reflect.get(body, 'message') ?? 'An API Error Occurred') as string,
		);
	}

	return body as User;
}

export function useUserProfile(token: string) {
	const key = `${getUserProfilePath}::${btoa(token)}`;
	const { data: user, error } = useSWR<User, Error>(key, getUserProfile);

	return {
		user,
		error,
		isLoading: !user && !error,
	};
}
