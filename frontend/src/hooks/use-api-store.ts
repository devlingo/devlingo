import { create, GetState, SetState } from 'zustand';

import { Project, User } from '@/types/api-types';

export interface ApiStore {
	projects: Project[];
	setProjects: (projects: Project[]) => void;
	setUser: (user: User) => void;
	user: User | null;
}

export function setUser(set: SetState<ApiStore>, _: GetState<ApiStore>) {
	return (user: User) => {
		set({ user });
	};
}

export function setProjects(set: SetState<ApiStore>, _: GetState<ApiStore>) {
	return (projects: Project[]) => {
		set({
			projects: projects.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime(),
			),
		});
	};
}

export const useApiStore = create<ApiStore>((set, get) => ({
	projects: [],
	setProjects: setProjects(set, get),
	setUser: setUser(set, get),
	user: null,
}));

export const useSetUser = () => useApiStore((s) => s.setUser);
export const useUser = () => useApiStore((s) => s.user);
export const useSetProjects = () => useApiStore((s) => s.setProjects);
export const useProjects = () => useApiStore((s) => s.projects);
