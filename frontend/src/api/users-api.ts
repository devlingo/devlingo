import { HttpMethod } from 'shared/constants';

import { fetcher } from '@/api/fetcher';
import { GET_USER_PROFILE_PATH } from '@/constants';
import { User } from '@/types';

export async function getUserProfile(): Promise<User> {
	return await fetcher<User>({
		url: GET_USER_PROFILE_PATH,
		method: HttpMethod.Get,
	});
}
