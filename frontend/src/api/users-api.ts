import { fetcher } from '@/api/fetcher';
import { GET_USER_PROFILE_PATH, HttpMethod } from '@/constants';
import { ApiParams, User } from '@/types';

export async function getUserProfile({
	token,
}: Pick<ApiParams, 'token'>): Promise<User> {
	return await fetcher<User>({
		token,
		url: GET_USER_PROFILE_PATH,
		method: HttpMethod.Get,
	});
}
