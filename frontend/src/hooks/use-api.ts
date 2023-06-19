import { Project } from '@reactflow/core';
import useSWR from 'swr';
import { SWRResponse } from 'swr/_internal';

import { fetcher } from '@/api';
import {
	ApiOperationId,
	GET_USER_PROFILE_PATH,
	GET_USER_PROJECTS_PATH,
	HttpMethod,
} from '@/constants';
import { useToken } from '@/hooks/use-user-store';
import { ApiParams, User } from '@/types/api-types';

export function createAPIHook<T>({
	operationId,
	method,
	defaultUrl,
}: {
	operationId: ApiOperationId;
	method: HttpMethod;
	defaultUrl?: string;
}): (
	url?: string,
	requestInit?: Omit<RequestInit, 'method'>,
) => SWRResponse<T, Error> {
	return (url = defaultUrl, requestInit?: Omit<RequestInit, 'method'>) => {
		if (!url) {
			throw new Error(`url for operation ${operationId} is not set`);
		}

		const token = useToken();
		return useSWR<T, Error>(
			[operationId, { ...requestInit, token, url, method }],
			([_, params]: [operation: string, params: ApiParams]) =>
				fetcher<T>(params),
		);
	};
}

export const useUserProfile = createAPIHook<User>({
	operationId: ApiOperationId.GetUserProfile,
	method: HttpMethod.Get,
	defaultUrl: GET_USER_PROFILE_PATH,
});

export const useUserProjects = createAPIHook<Project[]>({
	operationId: ApiOperationId.GetUserProjects,
	method: HttpMethod.Get,
	defaultUrl: GET_USER_PROJECTS_PATH,
});
