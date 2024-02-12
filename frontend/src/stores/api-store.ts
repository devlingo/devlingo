import { User } from '@prisma/client';
import { DesignResponseData, ProjectResponseData } from 'shared/types';
import { create, GetState, SetState } from 'zustand';
import { StateCreator } from 'zustand/vanilla';

import { sortByDateProp } from '@/utils/time';

export interface ApiStore {
	// currentDesign
	currentDesign: DesignResponseData | null;
	// projects
	projects: ProjectResponseData[];
	setCurrentDesign: (design: DesignResponseData | null) => void;
	setProjects: (projects: ProjectResponseData[]) => void;
	setUser: (user: User) => void;
	// user
	user: User | null;
}

export const apiStoreStateCreator: StateCreator<ApiStore> = (
	set: SetState<ApiStore>,
	_: GetState<ApiStore>,
) => ({
	// currentDesign
	currentDesign: null,

	// projects
	projects: [],

	setCurrentDesign: (currentDesign: DesignResponseData | null) => {
		set({ currentDesign });
	},

	setProjects: (projects: ProjectResponseData[]) => {
		set({
			projects: sortByDateProp(projects)('createdAt', 'desc'),
		});
	},

	setUser: (user: User) => {
		set({ user });
	},
	// user
	user: null,
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
