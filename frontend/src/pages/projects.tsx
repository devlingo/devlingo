import {
	PencilIcon,
	PlusCircleIcon,
	TrashIcon,
} from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
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
import { formatDate } from '@/utils/time';

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

	const { t } = useTranslation('projects');

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
								t('submit')
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default function Projects() {
	const { t } = useTranslation('projects');

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
				const data = await getProjects({ token });
				setProjects(data);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<main className="h-screen w-screen bg-base-300 flex flex-col justify-between">
			<header className="navbar bg-blue-100" />
			{isLoading ? (
				<div className="flex items-start">
					<div className="loading loading-lg" />
				</div>
			) : (
				<div className="p-4 grow flex items-center">
					<div className="flex mx-auto gap-4 border-2 border-accent rounded-box p-4">
						{projects.map((project, i) => (
							<div
								className="card card-compact bg-base-100"
								key={i}
							>
								<div className="card-body">
									<span className="card-title">
										{project.name}
									</span>
									<span className="text-sm mb-1">
										{project.description ?? ''}
									</span>
									<span className="text-xs">
										{t('projectDetailCreatedAt', {
											createdAt: formatDate(
												project.createdAt,
											),
										})}
									</span>
									<div className="divider m-0 text-base-content" />
									<div className="card-actions justify-end">
										<button className="btn btn-outline btn-sm">
											<TrashIcon className="h-3 w-3 text-base-content" />
										</button>
										<button className="btn btn-outline btn-sm">
											<PencilIcon className="h-3 w-3 text-base-content" />
										</button>
									</div>
								</div>
							</div>
						))}
						<div className="flex flex-col justify-around">
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
					{isCreateProjectModalOpen && (
						<CreateProjectModal
							closeModal={() => {
								setIsCreateProjectModalOpen(false);
							}}
						/>
					)}
				</div>
			)}
			<footer className="footer h-16 bg-blue-100" />
		</main>
	);
}
