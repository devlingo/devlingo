import { deepmerge } from 'deepmerge-ts';
import { Edge, Node } from 'reactflow';
import { HttpMethod } from 'shared/constants';
import { createNode } from 'shared/utils/node';

import { fetcher } from '@/api/fetcher';

export interface PromptRequest {
	useInput: string;
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
	useInput: string;
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
	return await fetcher<DesignData>({
		url: `prompt/${projectId}/${designId}`,
		method: HttpMethod.Post,
		data,
	});
}
