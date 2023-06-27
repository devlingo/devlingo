import { HttpMethod } from 'shared/constants';
import { DesignResponseData, DesignVersionResponse } from 'shared/types';

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

export async function retrieveDesignVersionById({
	designVersionId,
}: {
	designVersionId: string;
}): Promise<DesignVersionResponse> {
	return await fetcher<DesignVersionResponse>({
		url: `${DESIGN_API_BASE_PATH}/versions/${designVersionId}`,
		method: HttpMethod.Get,
	});
}
