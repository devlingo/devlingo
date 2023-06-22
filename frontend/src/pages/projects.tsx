import {
	PencilIcon,
	PlusCircleIcon,
	TrashIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import { deleteProject, getProjects } from '@/api';
import { CreateOrUpdateProjectModal } from '@/components/projects-page/create-or-update-project-modal';
import { WarningModal } from '@/components/warning-modal';
import { useProjects, useSetProjects } from '@/hooks/use-api-store';
import { Project } from '@/types';
import { formatDate } from '@/utils/time';

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['projects', 'common'])),
		},
	};
}

export default function Projects() {
	const { t } = useTranslation('projects');

	const projects = useProjects();
	const setProjects = useSetProjects();
	const [selectedProject, setSelectedProject] = useState<Project | null>(
		null,
	);
	const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] =
		useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [
		isCreateOrUpdateProjectModalOpen,
		setIsCreateOrUpdateProjectModalOpen,
	] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const data = await getProjects();
				setProjects(data);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const handleDeleteProject = async () => {
		setIsLoading(true);
		try {
			const { id: projectId } = selectedProject!;
			await deleteProject({ projectId });
			setProjects(projects.filter((project) => project.id !== projectId));
		} finally {
			setSelectedProject(null);
			setIsLoading(false);
		}
	};

	return (
		<main className="h-screen w-screen bg-base-300 flex flex-col justify-between">
			<header className="navbar bg-blue-100" />
			<div className="p-4 grow flex items-center">
				{isLoading && (
					<div className="flex items-start">
						<div className="loading loading-lg" />
					</div>
				)}
				<div className="flex mx-auto gap-4 border-2 border-accent rounded-box p-4">
					{projects.map((project, i) => (
						<div
							className="h-fit w-fit card card-compact bg-base-100"
							key={i}
						>
							<div className="card-body">
								<h2 className="card-title">{project.name}</h2>
								<p>{project.description ?? ''}</p>
								<span className="text-xs">
									{t('projectDetailCreatedAt', {
										createdAt: formatDate(
											project.createdAt,
										),
									})}
								</span>
								<div className="divider m-0 text-base-content" />
								<div className="card-actions justify-between">
									<div className="join">
										<button
											className="btn btn-outline btn-sm join-item"
											disabled={isLoading}
											onClick={() => {
												setSelectedProject(project);
												setIsCreateOrUpdateProjectModalOpen(
													true,
												);
											}}
										>
											<PencilIcon className="h-3 w-3 text-base-content" />
										</button>
										<button
											className="btn btn-outline btn-sm join-item"
											onClick={() => {
												setSelectedProject(project);
												setIsDeleteProjectModalOpen(
													true,
												);
											}}
											disabled={isLoading}
										>
											<TrashIcon className="h-3 w-3 text-warning" />
										</button>
									</div>
									<button className="btn btn-ghost btn-sm">
										<span className="badge badge-outline badge-info badge-md">
											{t('open')}
										</span>
									</button>
								</div>
							</div>
						</div>
					))}
					<div className="flex flex-col justify-around">
						<button
							className="btn btn-lg btn-ghost btn-circle"
							onClick={() => {
								setSelectedProject(null);
								setIsCreateOrUpdateProjectModalOpen(true);
							}}
							disabled={isLoading}
						>
							<PlusCircleIcon className="w-fit h-fit" />
						</button>
					</div>
				</div>
				{isCreateOrUpdateProjectModalOpen && (
					<CreateOrUpdateProjectModal
						closeModal={() => {
							setSelectedProject(null);
							setIsCreateOrUpdateProjectModalOpen(false);
						}}
						projects={projects}
						project={selectedProject}
					/>
				)}
				{isDeleteProjectModalOpen && (
					<WarningModal
						warningText={t('projectDeleteWarning', {
							projectName: selectedProject!.name,
						})}
						closeModal={() => {
							setSelectedProject(null);
							setIsDeleteProjectModalOpen(false);
						}}
						onContinue={() => {
							setIsDeleteProjectModalOpen(false);
							void handleDeleteProject();
						}}
					/>
				)}
			</div>
			<footer className="footer h-16 bg-blue-100" />
		</main>
	);
}
