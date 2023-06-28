import { HttpMethod } from 'shared/constants';
import { VersionResponse } from 'shared/types';

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
