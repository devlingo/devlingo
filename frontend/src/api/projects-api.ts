import { Project } from '@prisma/client';
import { HttpMethod } from 'shared/constants';
import { ProjectResponseData } from 'shared/types';

import { fetcher } from '@/api/fetcher';

export async function getProjects() {
	return await fetcher<ProjectResponseData[]>({
		url: 'projects/',
		method: HttpMethod.Get,
	});
}

export async function createProject(
	data: Pick<Project, 'name' | 'description'>,
) {
	return await fetcher<ProjectResponseData>({
		url: 'projects/',
		method: HttpMethod.Post,
		data,
	});
}

export async function updateProject({
	projectId,
	...data
}: Partial<Pick<Project, 'name' | 'description'>> & { projectId: string }) {
	return await fetcher<ProjectResponseData>({
		url: `projects/${projectId}`,
		method: HttpMethod.Patch,
		data,
	});
}

export async function deleteProject({ projectId }: { projectId: string }) {
	await fetcher<undefined>({
		url: `projects/${projectId}`,
		method: HttpMethod.Delete,
	});
}
