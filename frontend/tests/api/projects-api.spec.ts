import { HttpMethod } from 'shared/constants';
import { ProjectFactory } from 'shared/testing';
import { mockFetch } from 'tests/mocks';
import { beforeEach } from 'vitest';
import { mockReset } from 'vitest-mock-extended';

import {
	createProject,
	deleteProject,
	getProjects,
	updateProject,
} from '@/api';

describe('projects API tests', () => {
	beforeEach(() => {
		mockReset(mockFetch);
	});
	describe('getProjects tests', () => {
		it('returns a list of projects', async () => {
			const projects = await ProjectFactory.batch(10);
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(projects),
			});
			const data = await getProjects();

			expect(data).toEqual(projects);
			expect(mockFetch).toHaveBeenCalledWith(
				new URL(`http://www.example.com/v1/projects`),
				{
					headers: {
						'Authorization': 'Bearer test_token',
						'Content-Type': 'application/json',
						'X-Request-Id': 'uuidv4_value',
					},
					method: HttpMethod.Get,
				},
			);
		});
	});

	describe('createProject tests', () => {
		it('should create a project', async () => {
			const project = await ProjectFactory.build();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(project),
			});
			const body = {
				name: project.name,
				description: project.description,
			};
			const data = await createProject(body);

			expect(data).toEqual(project);
			expect(mockFetch).toHaveBeenCalledWith(
				new URL(`http://www.example.com/v1/projects`),
				{
					body: JSON.stringify(body),
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

	describe('updateProject tests', () => {
		it('should update a project', async () => {
			const project = await ProjectFactory.build();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(project),
			});
			const body = {
				name: project.name,
				description: project.description,
			};
			const data = await updateProject({
				projectId: project.id,
				...body,
			});

			expect(data).toEqual(project);
			expect(mockFetch).toHaveBeenCalledWith(
				new URL(`http://www.example.com/v1/projects/${project.id}`),
				{
					body: JSON.stringify(body),
					headers: {
						'Authorization': 'Bearer test_token',
						'Content-Type': 'application/json',
						'X-Request-Id': 'uuidv4_value',
					},
					method: HttpMethod.Patch,
				},
			);
		});
	});

	describe('deleteProject tests', () => {
		it('should delete a project', async () => {
			const project = await ProjectFactory.build();
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: () => Promise.resolve(),
			});

			// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
			const data = await deleteProject({ projectId: project.id });

			expect(data).toBeUndefined();
			expect(mockFetch).toHaveBeenCalledWith(
				new URL(`http://www.example.com/v1/projects/${project.id}`),
				{
					headers: {
						'Authorization': 'Bearer test_token',
						'Content-Type': 'application/json',
						'X-Request-Id': 'uuidv4_value',
					},
					method: HttpMethod.Delete,
				},
			);
		});
	});
});
