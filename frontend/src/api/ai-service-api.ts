import { Edge, Node } from 'reactflow';

import { AI_SERVICE_BASE_URL, EdgeTypes, ServiceNodeType } from '@/constants';
import { log } from '@/utils/logging';

export interface PromptRequest {
	promptContent: string;
	designData: {
		nodes: {
			data: {
				nodeType: string;
				formData: {
					nodeName: string;
				};
			};
			id: string;
			position: {
				x: number;
				y: number;
			};
			type: string;
		}[];
		edges: {
			id: string;
			source: string;
			target: string;
			type: string;
		}[];
	};
	nodeTypes: string[];
	edgeTypes: string[];
}
export interface PromptResponse {
	answer: string;
	design: { nodes: Node[]; edges: Edge[] };
}

export function parsePromptData({
	promptContent,
	nodes,
	edges,
}: {
	promptContent: string;
	nodes: Node[];
	edges: Edge[];
}): PromptRequest {
	return {
		promptContent,
		nodeTypes: Object.values(ServiceNodeType),
		edgeTypes: Object.values(EdgeTypes),
		designData: {
			nodes: nodes.map(
				({ data: { nodeType, formData }, id, position, type }) => ({
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					data: { nodeType, formData },
					id,
					position,
					type: type!,
				}),
			),
			edges: edges.map(({ id, source, target, type }) => ({
				id,
				source,
				target,
				type: type!,
			})),
		},
	};
}

export interface PromptRequestParams {
	promptContent: string;
	nodes: Node[];
	edges: Edge[];
	designId: string;
	projectId: string;
}

export async function requestPrompt({
	designId,
	projectId,
	...data
}: PromptRequestParams): Promise<PromptResponse> {
	const url = `${AI_SERVICE_BASE_URL}/v1/prompt/${projectId}/${designId}`;
	const request = {
		method: 'POST',
		body: JSON.stringify(parsePromptData(data)),
		headers: {
			'Content-Type': 'application/json',
		},
	} satisfies RequestInit;

	log('sending request', {
		url,
		request,
	});

	const response = await fetch(url, request);

	const body = (await response.json()) as Record<string, any>;

	log('received response', {
		status: response.status,
		error: !response.ok,
		body,
	});

	if (!response.ok) {
		throw new Error(
			(Reflect.get(body, 'message') ?? 'An API Error Occurred') as string,
		);
	}

	return body as PromptResponse;
}
