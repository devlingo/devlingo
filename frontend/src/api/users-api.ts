import { User } from '@prisma/client';
import { HttpMethod } from 'shared/constants';

import { fetcher } from '@/api/fetcher';

export async function getUserProfile(): Promise<User> {
	return await fetcher<User>({
		method: HttpMethod.Get,
		url: 'users/profile',
	});
}
