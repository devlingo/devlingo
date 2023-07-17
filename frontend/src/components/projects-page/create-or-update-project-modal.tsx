import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { ProjectResponseData } from 'shared/types';

import { createProject, updateProject } from '@/api';
import { useSetProjects } from '@/stores/api-store';
import { handleChange } from '@/utils/helpers';

export function CreateOrUpdateProjectModal({
	closeModal,
	project,
	projects,
}: {
	closeModal: () => void;
	project: ProjectResponseData | null;
	projects: ProjectResponseData[];
}) {
	const setProjects = useSetProjects();
	const [name, setName] = useState(project?.name ?? '');
	const [description, setDescription] = useState(project?.description ?? '');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { t } = useTranslation('projects');

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			if (project) {
				const updatedProject = await updateProject({
					name: name === project.name ? undefined : name,
					description:
						description === project.description
							? undefined
							: description,
					projectId: project.id,
				});
				setProjects(
					projects.map((p) =>
						p.id === project.id ? updatedProject : p,
					),
				);
			} else {
				const createdProject = await createProject({
					name,
					description: description || null,
				});
				setProjects([...projects, createdProject]);
			}
		} finally {
			setIsSubmitting(false);
			closeModal();
		}
	};

	return (
		<div
			className="modal modal-open modal-middle"
			data-testid="create-or-update-project-modal"
		>
			<div className="modal-box bg-base-100">
				<h3 className="font-bold text-lg">
					{project
						? t('createProjectModalTitle')!
						: t('updateProjectModalTitle')!}
				</h3>
				<form className="form-control">
					<label className="label">
						<span className="label-text">
							{t('projectNameInputLabel')!}
						</span>
					</label>
					<input
						type="text"
						className="input input-bordered"
						data-testid="create-or-update-project-modal-name-input"
						placeholder={t('projectNameInputPlaceholder')!}
						value={name}
						onChange={handleChange(setName)}
						disabled={isSubmitting}
					/>
					<label className="label">
						<span className="label-text">
							{t('projectDescriptionTextAreaLabel')!}
						</span>
					</label>
					<textarea
						className="textarea textarea-bordered textarea-md w-full"
						data-testid="create-or-update-project-modal-description-textarea"
						value={description}
						onChange={handleChange(setDescription)}
						disabled={isSubmitting}
					/>
					<div className="modal-action">
						<button
							className="btn btn-ghost opacity-80"
							data-testid="create-or-update-project-modal-cancel-button"
							disabled={isSubmitting}
							onClick={closeModal}
						>
							{t('cancel')}
						</button>
						<button
							className="btn btn-primary"
							data-testid="create-or-update-project-modal-submit-button"
							disabled={
								name.length === 0 ||
								(project?.name === name &&
									project.description === description) ||
								isSubmitting
							}
							onClick={(event) => {
								event.preventDefault();
								void handleSubmit();
							}}
						>
							{isSubmitting ? (
								<div className="loading loading-dots" />
							) : (
								t('submit')
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
