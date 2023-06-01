import { Edge, Node } from 'reactflow';

import { AI_SERVICE_BASE_URL, EdgeTypes, ServiceNodeType } from '@/constants';

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

export async function requestPrompt({
	designId,
	projectId,
	...data
}: {
	promptContent: string;
	nodes: Node[];
	edges: Edge[];
	designId: string;
	projectId: string;
}): Promise<PromptResponse> {
	const response = await fetch(
		`${AI_SERVICE_BASE_URL}/v1/prompt/${projectId}/${designId}`,
		{
			method: 'POST',
			body: JSON.stringify(parsePromptData(data)),
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
	const body = (await response.json()) as Record<string, any>;
	if (!response.ok) {
		throw new Error(
			(Reflect.get(body, 'message') ?? 'An API Error Occurred') as string,
		);
	}

	return body as PromptResponse;
}
