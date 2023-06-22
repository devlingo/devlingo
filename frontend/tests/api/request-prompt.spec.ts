import { Auth } from 'firebase/auth';
import { mockFetch } from 'tests/mocks';
import { SpyInstance } from 'vitest';

import {
	mergeEdges,
	mergeNodes,
	parsePromptData,
	requestPrompt,
} from '@/api/prompt-api';
import * as firebaseUtils from '@/utils/firebase';

vi.mock('uuid', () => ({
	v4: vi.fn().mockReturnValue('uuidv4_value'),
}));

describe('requestPrompt tests', () => {
	let getFirebaseAuthSpy: SpyInstance<[], Promise<Auth>>;

	beforeEach(() => {
		getFirebaseAuthSpy = vi.spyOn(firebaseUtils, 'getFirebaseAuth');
		getFirebaseAuthSpy.mockResolvedValue({
			currentUser: {
				getIdToken: vi.fn().mockResolvedValue('test_token'),
			},
		} as any);
	});

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
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		});

		const result = await requestPrompt(mockData);

		expect(mockFetch).toHaveBeenCalledWith(
			new URL(
				'http://www.example.com/v1/prompt/testProjectId/testDesignId',
			),
			{
				method: 'POST',
				body: JSON.stringify(parsePromptData(mockData)),
				headers: {
					'Authorization': 'Bearer test_token',
					'Content-Type': 'application/json',
					'X-Request-Id': 'uuidv4_value',
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
		mockFetch.mockResolvedValueOnce({
			ok: false,
			json: () => Promise.resolve({ message: 'API Error' }),
		});
		await expect(requestPrompt(mockData)).rejects.toThrow('API Error');
	});
});
