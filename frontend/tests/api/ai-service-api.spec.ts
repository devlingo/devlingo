import { requestPrompt } from '@/api/ai-service-api';

describe('requestPrompt tests', () => {
	it('handles success correctly', async () => {
		const mockResponse = {
			answer: 'test answer',
			design: {
				nodes: [],
				edges: [],
			},
		};
		const mockData = {
			promptContent: 'test prompt',
			nodes: [],
			edges: [],
			designId: 'testDesignId',
			projectId: 'testProjectId',
		};
		vi.spyOn(global, 'fetch').mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		});
		const result = await requestPrompt(mockData);
		expect(result).toEqual(mockResponse);
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
