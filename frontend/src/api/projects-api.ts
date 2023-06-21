import { fetcher } from '@/api/fetcher';
import { GET_USER_PROJECTS_PATH, HttpMethod } from '@/constants';
import { ApiParams, Project } from '@/types';

export async function getProjects({ token }: Pick<ApiParams, 'token'>) {
	return await fetcher<Project[]>({
		token,
		url: GET_USER_PROJECTS_PATH,
		method: HttpMethod.Get,
	});
}

export async function createProject({
	token,
	...body
}: Pick<Project, 'name' | 'description'> & Pick<ApiParams, 'token'>) {
	return await fetcher<Project>({
		token,
		url: GET_USER_PROJECTS_PATH,
		method: HttpMethod.Post,
		body: JSON.stringify(body),
	});
}
