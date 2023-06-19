import { fetcher } from '@/api/fetcher';
import { HttpMethod } from '@/constants';
import { ApiParams, Project } from '@/types';

export async function createProject({
	token,
	userId,
	...body
}: { userId: string } & Pick<Project, 'name' | 'description'> &
	Pick<ApiParams, 'token'>) {
	return await fetcher<Project>({
		token,
		url: `projects/${userId}`,
		method: HttpMethod.Post,
		body: JSON.stringify(body),
	});
}
