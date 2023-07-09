import { HttpMethod } from 'shared/constants';
import { DesignFactory } from 'shared/testing';
import { mockFetch } from 'tests/mocks';
import { mockReset } from 'vitest-mock-extended';

import { requestPrompt } from '@/api';

describe('prompt API tests', () => {
	beforeEach(() => {
		mockReset(mockFetch);
	});

	describe('requestPrompt tests', () => {
		it('calls the expected URL and returns the expected data', async () => {
			const design = await DesignFactory.build();
			const responseData = {
				nodes: [],
				edges: [],
			};
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(responseData),
			});

			const data = await requestPrompt({
				designId: design.id,
				projectId: design.projectId,
				useInput: 'test_input',
			});

			expect(data).toEqual(responseData);
			expect(mockFetch).toHaveBeenCalledWith(
				new URL(
					`http://www.example.com/v1/${design.projectId}/${design.id}/prompt`,
				),
				{
					body: '{"useInput":"test_input"}',
					headers: {
						'Authorization': 'Bearer test_token',
						'Content-Type': 'application/json',
						'X-Request-Id': 'uuidv4_value',
					},
					method: HttpMethod.Post,
				},
			);
		});
	});
});
