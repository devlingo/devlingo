import { Edge, Node } from 'reactflow';
import { HttpMethod } from 'shared/constants';
import { DesignData } from 'shared/types';

import { fetcher } from '@/api/fetcher';

export async function requestPrompt({
	designId,
	projectId,
	...data
}: {
	useInput: string;
	designId: string;
	projectId: string;
}): Promise<{
	nodes: Node[];
	edges: Edge[];
}> {
	console.log(data);
	return await fetcher<DesignData>({
		url: `${projectId}/${designId}/prompt`,
		method: HttpMethod.Post,
		data,
	});
}
