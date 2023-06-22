import { fetcher } from '@/api/fetcher';
import { GET_USER_PROJECTS_PATH, HttpMethod } from '@/constants';
import { Project } from '@/types';

export async function getProjects() {
	return await fetcher<Project[]>({
		url: GET_USER_PROJECTS_PATH,
		method: HttpMethod.Get,
	});
}

export async function createProject({
	...body
}: Pick<Project, 'name' | 'description'>) {
	return await fetcher<Project>({
		url: GET_USER_PROJECTS_PATH,
		method: HttpMethod.Post,
		body: JSON.stringify(body),
	});
}

export async function updateProject({
	projectId,
	...body
}: Partial<Pick<Project, 'name' | 'description'>> & { projectId: string }) {
	return await fetcher<Project>({
		url: GET_USER_PROJECTS_PATH + '/' + projectId,
		method: HttpMethod.Patch,
		body: JSON.stringify(body),
	});
}

export async function deleteProject({ projectId }: { projectId: string }) {
	return await fetcher<Project>({
		url: GET_USER_PROJECTS_PATH + '/' + projectId,
		method: HttpMethod.Delete,
	});
}
