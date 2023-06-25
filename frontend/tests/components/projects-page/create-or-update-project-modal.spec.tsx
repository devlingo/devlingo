import { ProjectFactory } from 'shared/testing';
import { mockFetch } from 'tests/mocks';
import { fireEvent, render, screen, waitFor } from 'tests/test-utils';
import { beforeEach } from 'vitest';
import { mockReset } from 'vitest-mock-extended';

import { CreateOrUpdateProjectModal } from '@/components/projects-page/create-or-update-project-modal';
import * as apiStore from '@/hooks/use-api-store';

describe('CreateOrUpdateProjectModal tests', () => {
	const mockSetProjects = vi.fn();

	beforeEach(() => {
		mockReset(mockFetch);
		mockReset(mockSetProjects);
		vi.spyOn(apiStore, 'useSetProjects').mockReturnValue(mockSetProjects);
	});

	it('creates a new project', async () => {
		const closeModal = vi.fn();
		const project = await ProjectFactory.build();

		mockFetch.mockImplementationOnce((_, { body }: { body: string }) => ({
			ok: true,
			status: 201,
			json: async () =>
				Promise.resolve({
					...project,
					...JSON.parse(body),
				}),
		}));

		render(
			<CreateOrUpdateProjectModal
				closeModal={closeModal}
				project={null}
				projects={[]}
			/>,
		);

		const nameInput = screen.getByTestId(
			'create-or-update-project-modal-name-input',
		);
		const descriptionTextarea = screen.getByTestId(
			'create-or-update-project-modal-description-textarea',
		);
		const submitButton = screen.getByTestId(
			'create-or-update-project-modal-submit-button',
		);
		fireEvent.change(nameInput, { target: { value: 'New Project' } });
		fireEvent.change(descriptionTextarea, {
			target: { value: 'New Project Description' },
		});
		fireEvent.click(submitButton);
		await waitFor(() =>
			expect(mockSetProjects).toHaveBeenCalledWith([
				{
					...project,
					name: 'New Project',
					description: 'New Project Description',
				},
			]),
		);
		expect(closeModal).toHaveBeenCalled();
	});

	it('updates a project', async () => {
		const closeModal = vi.fn();
		const projects = await ProjectFactory.batch(1);

		mockFetch.mockImplementationOnce((_, { body }: { body: string }) => ({
			ok: true,
			status: 200,
			json: async () =>
				Promise.resolve({
					...projects[0],
					...JSON.parse(body),
				}),
		}));

		render(
			<CreateOrUpdateProjectModal
				closeModal={closeModal}
				project={projects[0] as any}
				projects={projects as any}
			/>,
		);

		const nameInput = screen.getByTestId(
			'create-or-update-project-modal-name-input',
		);
		const descriptionTextarea = screen.getByTestId(
			'create-or-update-project-modal-description-textarea',
		);
		const submitButton = screen.getByTestId(
			'create-or-update-project-modal-submit-button',
		);
		fireEvent.change(nameInput, { target: { value: 'Updated Project' } });
		fireEvent.change(descriptionTextarea, {
			target: { value: 'Updated Project Description' },
		});
		fireEvent.click(submitButton);
		await waitFor(() =>
			expect(mockSetProjects).toHaveBeenCalledWith([
				{
					...projects[0],
					name: 'Updated Project',
					description: 'Updated Project Description',
				},
			]),
		);
		expect(closeModal).toHaveBeenCalled();
	});

	it('closes on cancel', async () => {
		const closeModal = vi.fn();
		const setProjects = vi.fn();
		render(
			<CreateOrUpdateProjectModal
				closeModal={closeModal}
				project={null}
				projects={[]}
			/>,
		);
		const cancelButton = screen.getByTestId(
			'create-or-update-project-modal-cancel-button',
		);
		fireEvent.click(cancelButton);
		await waitFor(() => expect(setProjects).not.toHaveBeenCalled());
		expect(closeModal).toHaveBeenCalled();
	});
});
