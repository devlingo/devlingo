import { HttpMethod } from 'shared/constants';
import { VersionData, VersionResponse } from 'shared/types';

import { fetcher } from '@/api/fetcher';

export async function retrieveVersionById({
	versionId,
	projectId,
	designId,
}: {
	projectId: string;
	designId: string;
	versionId: string;
}): Promise<VersionResponse> {
	return await fetcher<VersionResponse>({
		url: `${projectId}/${designId}/versions/${versionId}`,
		method: HttpMethod.Get,
	});
}

export async function createVersion({
	projectId,
	designId,
	data,
}: {
	projectId: string;
	designId: string;
	data: VersionData;
}): Promise<Omit<VersionResponse, 'data'>> {
	return await fetcher<VersionResponse>({
		url: `${projectId}/${designId}/versions/`,
		method: HttpMethod.Post,
		data,
	});
}
