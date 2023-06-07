import {
	mergeEdges,
	mergeNodes,
	parsePromptData,
	requestPrompt,
} from '@/api/ai-service-api';
import { AI_SERVICE_BASE_URL } from '@/constants';

describe('requestPrompt tests', () => {
	it('handles success response', async () => {
		const mockResponse = {
			answer: 'test answer',
			design: {
				nodes: [
					{
						id: '1',
						data: { nodeType: 'test' },
						position: { x: 0, y: 0 },
						type: 'default',
					},
				],
				edges: [{ id: '1', source: '1', target: '2', type: 'default' }],
			},
		};
		const mockData = {
			promptContent: 'test prompt',
			nodes: [
				{
					id: '1',
					data: { nodeType: 'test' },
					position: { x: 0, y: 0 },
					type: 'default',
				},
			],
			edges: [{ id: '1', source: '1', target: '2', type: 'default' }],
			designId: 'testDesignId',
			projectId: 'testProjectId',
		};
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		});
		global.fetch = mockFetch;

		const result = await requestPrompt(mockData);

		expect(mockFetch).toHaveBeenCalledWith(
			`${AI_SERVICE_BASE_URL}/v1/prompt/${mockData.projectId}/${mockData.designId}`,
			{
				method: 'POST',
				body: JSON.stringify(parsePromptData(mockData)),
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		expect(result.answer).toEqual(mockResponse.answer);
		expect(result.nodes).toEqual(mockResponse.design.nodes);
		expect(result.edges).toEqual(mockResponse.design.edges);
	});

	it('merges edges', () => {
		const originalEdges = [
			{ id: '1', source: '1', target: '2', type: 'default' },
		];
		const designEdges = [
			{ id: '1', source: '1', target: '2', type: 'new' },
		];

		const result = mergeEdges(originalEdges, designEdges);

		expect(result).toEqual([
			{ id: '1', source: '1', target: '2', type: 'new' },
		]);
	});

	it('merges nodes', () => {
		const originalNodes = [
			{
				id: '1',
				data: { nodeType: 'test' },
				position: { x: 0, y: 0 },
				type: 'default',
			},
		];
		const designNodes = [
			{
				id: '1',
				data: { nodeType: 'new' },
				position: { x: 1, y: 1 },
				type: 'default',
			},
		];

		const result = mergeNodes(originalNodes, designNodes);

		expect(result).toEqual([
			{
				id: '1',
				data: { nodeType: 'new' },
				position: { x: 1, y: 1 },
				type: 'default',
			},
		]);
	});

	it('handles an error correctly', async () => {
		const mockData = {
			promptContent: 'test prompt',
			nodes: [],
			edges: [],
			designId: 'testDesignId',
			projectId: 'testProjectId',
		};
		vi.spyOn(global, 'fetch').mockResolvedValue({
			ok: false,
			json: () => Promise.resolve({ message: 'API Error' }),
		});
		await expect(requestPrompt(mockData)).rejects.toThrow('API Error');
	});
});
