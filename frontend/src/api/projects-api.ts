import { Project } from '@prisma/client';
import { HttpMethod } from 'shared/constants';
import { ProjectResponseData } from 'shared/types';

import { fetcher } from '@/api/fetcher';

export const PROJECTS_API_BASE_PATH = 'projects';

export async function getProjects() {
	return await fetcher<ProjectResponseData[]>({
		url: PROJECTS_API_BASE_PATH,
		method: HttpMethod.Get,
	});
}

export async function createProject(
	body: Pick<Project, 'name' | 'description'>,
) {
	return await fetcher<ProjectResponseData>({
		url: PROJECTS_API_BASE_PATH,
		method: HttpMethod.Post,
		body: JSON.stringify(body),
	});
}

export async function updateProject({
	projectId,
	...body
}: Partial<Pick<Project, 'name' | 'description'>> & { projectId: string }) {
	return await fetcher<ProjectResponseData>({
		url: PROJECTS_API_BASE_PATH + '/' + projectId,
		method: HttpMethod.Patch,
		body: JSON.stringify(body),
	});
}

export async function deleteProject({ projectId }: { projectId: string }) {
	return await fetcher<void>({
		url: PROJECTS_API_BASE_PATH + '/' + projectId,
		method: HttpMethod.Delete,
	});
}
