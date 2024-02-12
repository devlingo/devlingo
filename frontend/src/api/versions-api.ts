import { HttpMethod } from 'shared/constants';
import { VersionData, VersionResponse } from 'shared/types';

import { fetcher } from '@/api/fetcher';

export async function retrieveVersionById({
	versionId,
	projectId,
	designId,
}: {
	designId: string;
	projectId: string;
	versionId: string;
}): Promise<VersionResponse> {
	return await fetcher<VersionResponse>({
		method: HttpMethod.Get,
		url: `${projectId}/${designId}/versions/${versionId}`,
	});
}

export async function createVersion({
	projectId,
	designId,
	data,
}: {
	data: VersionData;
	designId: string;
	projectId: string;
}): Promise<Omit<VersionResponse, 'data'>> {
	return await fetcher<VersionResponse>({
		data,
		method: HttpMethod.Post,
		url: `${projectId}/${designId}/versions/`,
	});
}
