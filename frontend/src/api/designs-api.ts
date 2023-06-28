import { HttpMethod } from 'shared/constants';
import { DesignResponseData } from 'shared/types';

import { fetcher } from '@/api/fetcher';

export async function retrieveDesignById({
	designId,
}: {
	designId: string;
}): Promise<DesignResponseData> {
	return await fetcher<DesignResponseData>({
		url: `designs/${designId}`,
		method: HttpMethod.Get,
	});
}
