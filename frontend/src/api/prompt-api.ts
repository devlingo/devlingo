import { Edge, Node } from 'reactflow';
import { HttpMethod } from 'shared/constants';
import { DesignData } from 'shared/types';

import { fetcher } from '@/api/fetcher';

export async function requestPrompt({
	designId,
	projectId,
	...data
}: {
	designId: string;
	projectId: string;
	useInput: string;
}): Promise<{
	edges: Edge[];
	nodes: Node[];
}> {
	return await fetcher<DesignData>({
		data,
		method: HttpMethod.Post,
		url: `${projectId}/${designId}/prompt`,
	});
}
