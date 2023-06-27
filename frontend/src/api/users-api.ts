import { User } from '@prisma/client';
import { HttpMethod } from 'shared/constants';

import { fetcher } from '@/api/fetcher';

export const GET_USER_PROFILE_PATH = 'users/profile';

export async function getUserProfile(): Promise<User> {
	return await fetcher<User>({
		url: GET_USER_PROFILE_PATH,
		method: HttpMethod.Get,
	});
}
