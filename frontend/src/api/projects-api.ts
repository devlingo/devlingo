import { Project } from '@prisma/client';
import { HttpMethod } from 'shared/constants';
import { ProjectResponseData } from 'shared/types';

import { fetcher } from '@/api/fetcher';

export async function getProjects() {
	return await fetcher<ProjectResponseData[]>({
		method: HttpMethod.Get,
		url: 'projects/',
	});
}

export async function createProject(
	data: Pick<Project, 'name' | 'description'>,
) {
	return await fetcher<ProjectResponseData>({
		data,
		method: HttpMethod.Post,
		url: 'projects/',
	});
}

export async function updateProject({
	projectId,
	...data
}: Partial<Pick<Project, 'name' | 'description'>> & { projectId: string }) {
	return await fetcher<ProjectResponseData>({
		data,
		method: HttpMethod.Patch,
		url: `projects/${projectId}`,
	});
}

export async function deleteProject({ projectId }: { projectId: string }) {
	await fetcher<undefined>({
		method: HttpMethod.Delete,
		url: `projects/${projectId}`,
	});
}
