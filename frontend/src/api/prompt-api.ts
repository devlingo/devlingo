import { deepmerge } from 'deepmerge-ts';
import { Edge, Node } from 'reactflow';
import { EdgeType, HttpMethod, ServiceType } from 'shared/constants';

import { fetcher } from '@/api/fetcher';
import { createNode } from '@/utils/node';

export interface PromptRequest {
	promptContent: string;
	designData: DesignData;
	nodeTypes: string[];
	edgeTypes: string[];
}
export interface DesignData {
	nodes: NodeData[];
	edges: EdgeData[];
}

export interface NodeData {
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
}

export interface EdgeData {
	id: string;
	source: string;
	target: string;
	type: string;
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
		nodeTypes: Object.values(ServiceType),
		edgeTypes: Object.values(EdgeType),
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

export function mergeNodes(originalNodes: Node[], designNodes: Node[]): Node[] {
	return designNodes.map((node) => {
		const existingNode = originalNodes.find((n) => n.id === node.id);
		return existingNode
			? deepmerge(existingNode, node)
			: createNode({ ...node });
	});
}

export function mergeEdges(originalEdges: Edge[], designEdges: Edge[]): Edge[] {
	return designEdges.map((edge) => {
		const existingEdge = originalEdges.find((e) => e.id === edge.id);
		return existingEdge ? deepmerge(existingEdge, edge) : edge;
	});
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
}: PromptRequestParams): Promise<{
	nodes: Node[];
	edges: Edge[];
}> {
	const design = await fetcher<DesignData>({
		url: `prompt/${projectId}/${designId}`,
		method: HttpMethod.Post,
		data: parsePromptData(data),
	});
	const edges = mergeEdges(data.edges, design.edges);
	const nodes = mergeNodes(data.nodes, design.nodes);
	return { nodes, edges };
}
