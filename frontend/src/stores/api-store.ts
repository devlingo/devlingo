import { User } from '@prisma/client';
import { DesignResponseData, ProjectResponseData } from 'shared/types';
import { create, GetState, SetState } from 'zustand';
import { StateCreator } from 'zustand/vanilla';

import { sortByDateProp } from '@/utils/time';

export interface ApiStore {
	// user
	user: User | null;
	setUser: (user: User) => void;
	// projects
	projects: ProjectResponseData[];
	setProjects: (projects: ProjectResponseData[]) => void;
	// currentDesign
	currentDesign: DesignResponseData | null;
	setCurrentDesign: (design: DesignResponseData | null) => void;
}

export const apiStoreStateCreator: StateCreator<ApiStore> = (
	set: SetState<ApiStore>,
	_: GetState<ApiStore>,
) => ({
	// user
	user: null,
	setUser: (user: User) => {
		set({ user });
	},
	// projects
	projects: [],
	setProjects: (projects: ProjectResponseData[]) => {
		set({
			projects: sortByDateProp(projects)('createdAt', 'desc'),
		});
	},
	// currentDesign
	currentDesign: null,
	setCurrentDesign: (currentDesign: DesignResponseData | null) => {
		set({ currentDesign });
	},
});

export const useApiStore = create(apiStoreStateCreator);

export const useSetUser = () => useApiStore((s) => s.setUser);
export const useUser = () => useApiStore((s) => s.user);
export const useSetProjects = () => useApiStore((s) => s.setProjects);
export const useProjects = () => useApiStore((s) => s.projects);
export const useProject = (projectId: string) => {
	const projects = useProjects();
	return projects.find((project) => project.id === projectId);
};
export const useSetCurrentDesign = () => useApiStore((s) => s.setCurrentDesign);
export const useCurrentDesign = () => useApiStore((s) => s.currentDesign);
