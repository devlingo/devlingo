import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import { createProject, getProjects } from '@/api';
import {
	useAddProject,
	useProjects,
	useSetProjects,
	useToken,
} from '@/hooks/use-api-store';

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['projects', 'common'])),
		},
	};
}

export function CreateProjectModal({ closeModal }: { closeModal: () => void }) {
	const token = useToken()!;
	const addProject = useAddProject();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { t } = useTranslation('project');

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			const project = await createProject({
				token,
				name,
				description: description || null,
			});
			addProject(project);
		} finally {
			setIsSubmitting(false);
			closeModal();
		}
	};

	return (
		<div
			className="modal modal-open modal-bottom sm:modal-middle"
			data-testid="create-project-modal"
		>
			<div className="modal-box bg-base-100">
				<h3 className="font-bold text-lg">
					{t('createProjectModalTitle')!}
				</h3>
				<form className="form-control">
					<label className="label">
						<span className="label-text">
							{t('createProjectNameInputLabel')!}
						</span>
					</label>
					<input
						type="text"
						className="input input-bordered"
						data-testid="create-project-modal-name-input"
						placeholder={t('createProjectNameInputPlaceholder')!}
						value={name}
						onChange={(event) => {
							setName(event.target.value);
						}}
						disabled={isSubmitting}
					/>
					<label className="label">
						<span className="label-text">
							{t('createProjectDescriptionTextAreaLabel')!}
						</span>
					</label>
					<textarea
						placeholder={
							t('createProjectDescriptionTextAreaPlaceholder')!
						}
						className="textarea textarea-bordered textarea-md w-full"
						data-testid="create-project-modal-description-textarea"
						value={description}
						onChange={(event) => {
							setDescription(event.target.value);
						}}
						disabled={isSubmitting}
					/>
					<div className="modal-action">
						<button
							className="btn btn-ghost opacity-80"
							data-testid="create-project-modal-cancel-button"
							disabled={isSubmitting}
							onClick={() => {
								closeModal();
							}}
						>
							{t('cancel')}
						</button>
						<button
							className="btn btn-primary"
							data-testid="create-project-modal-submit-button"
							disabled={!name.length || isSubmitting}
							onClick={() => {
								void handleSubmit();
							}}
						>
							{isSubmitting ? (
								<div className="loading loading-dots" />
							) : (
								'submit'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default function Projects() {
	const token = useToken()!;
	const projects = useProjects();
	const setProjects = useSetProjects();
	const [isLoading, setIsLoading] = useState(true);
	const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
		useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				setProjects(await getProjects({ token }));
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<main className="h-screen w-screen bg-base-300 flex items-center">
			{isLoading ? (
				<div className="loading loading-lg" />
			) : (
				<div className="h-full w-full">
					<div className="flex">
						{projects.map((project, i) => (
							<div
								className="card w-96 bg-base-100 shadow-xl"
								key={i}
							>
								<div className="card-body">
									<h2 className="card-title">
										{project.name}
									</h2>
									<p>{project.description ?? ''}</p>
									<div className="card-actions justify-end">
										<button className="btn btn-primary">
											Buy Now
										</button>
									</div>
								</div>
							</div>
						))}
						<div className="card w-fit bg-base-100 shadow-xl">
							<div className="card-body">
								<button
									className="btn btn-lg btn-ghost btn-circle"
									onClick={() => {
										setIsCreateProjectModalOpen(true);
									}}
								>
									<PlusCircleIcon className="w-fit h-fit" />
								</button>
							</div>
						</div>
					</div>
					{isCreateProjectModalOpen && (
						<CreateProjectModal
							closeModal={() => {
								setIsCreateProjectModalOpen(false);
							}}
						/>
					)}
				</div>
			)}
		</main>
	);
}
