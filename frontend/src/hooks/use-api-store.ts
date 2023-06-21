import { create, GetState, SetState } from 'zustand';

import { Project, User } from '@/types/api-types';

export interface ApiStore {
	addProject: (project: Project) => void;
	projects: Project[];
	setProjects: (projects: Project[]) => void;
	setToken: (token: string) => void;
	setUser: (user: User) => void;
	token: string | null;
	user: User | null;
}

export function setToken(set: SetState<ApiStore>, _: GetState<ApiStore>) {
	return (token: string) => {
		set({ token });
	};
}

export function setUser(set: SetState<ApiStore>, _: GetState<ApiStore>) {
	return (user: User) => {
		set({ user });
	};
}

export function setProjects(set: SetState<ApiStore>, _: GetState<ApiStore>) {
	return (projects: Project[]) => {
		set({ projects });
	};
}

export function addProject(set: SetState<ApiStore>, get: GetState<ApiStore>) {
	return (project: Project) => {
		const projects = get().projects;
		set({
			projects: [...projects, project].sort((a, b) =>
				a.name > b.name ? 1 : a.name < b.name ? -1 : 0,
			),
		});
	};
}

export const useApiStore = create<ApiStore>((set, get) => ({
	addProject: addProject(set, get),
	projects: [],
	setProjects: setProjects(set, get),
	setToken: setToken(set, get),
	setUser: setUser(set, get),
	token: null,
	user: null,
}));

export const useSetToken = () => useApiStore((s) => s.setToken);
export const useToken = () => useApiStore((s) => s.token);

export const useSetUser = () => useApiStore((s) => s.setUser);
export const useUser = () => useApiStore((s) => s.user);
export const useAddProject = () => useApiStore((s) => s.addProject);
export const useSetProjects = () => useApiStore((s) => s.setProjects);
export const useProjects = () => useApiStore((s) => s.projects);
