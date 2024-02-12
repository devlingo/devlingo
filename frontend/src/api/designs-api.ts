import { HttpMethod } from 'shared/constants';
import { DesignResponseData } from 'shared/types';

import { fetcher } from '@/api/fetcher';

export async function retrieveDesignById({
	designId,
	projectId,
}: {
	designId: string;
	projectId: string;
}): Promise<DesignResponseData> {
	return await fetcher<DesignResponseData>({
		method: HttpMethod.Get,
		url: `${projectId}/designs/${designId}`,
	});
}
