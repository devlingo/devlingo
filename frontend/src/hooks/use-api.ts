import useSWR from 'swr';
import { SWRResponse } from 'swr/_internal';

import { getUserProfile } from '@/api/get-user-profile';
import { ApiOperations } from '@/constants';
import { useToken } from '@/hooks/use-user-store';
import { ApiParams, User } from '@/types/api-types';

const apiOperationHandlerMap: Record<
	ApiOperations,
	(params: ApiParams) => Promise<any>
> = {
	[ApiOperations.GetUserProfile]: getUserProfile,
};

export function createUseApi<T, P = any>(
	operation: ApiOperations,
): (params: P) => SWRResponse<T, Error> {
	const handler = apiOperationHandlerMap[operation];
	return (params: P) => {
		const token = useToken();
		return useSWR<T, Error>(
			[operation, { ...params, token }],
			([_, apiParams]: [string, ApiParams<P>]) => handler(apiParams),
		);
	};
}

export const useUserProfile = createUseApi<User>(ApiOperations.GetUserProfile);
