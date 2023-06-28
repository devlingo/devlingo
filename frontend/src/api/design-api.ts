import { HttpMethod } from 'shared/constants';
import { DesignResponseData, VersionResponse } from 'shared/types';

import { fetcher } from '@/api/fetcher';

export const DESIGN_API_BASE_PATH = 'designs';

export async function retrieveDesignById({
	designId,
}: {
	designId: string;
}): Promise<DesignResponseData> {
	return await fetcher<DesignResponseData>({
		url: `${DESIGN_API_BASE_PATH}/${designId}`,
		method: HttpMethod.Get,
	});
}

export async function retrieveVersionById({
	versionId,
}: {
	versionId: string;
}): Promise<VersionResponse> {
	return await fetcher<VersionResponse>({
		url: `${DESIGN_API_BASE_PATH}/versions/${versionId}`,
		method: HttpMethod.Get,
	});
}
