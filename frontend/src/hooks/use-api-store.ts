import { create, GetState, SetState } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
		set({
			projects: projects.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime(),
			),
		});
	};
}

export function addProject(_: SetState<ApiStore>, get: GetState<ApiStore>) {
	return (project: Project) => {
		const projects = get().projects;
		const setProjects = get().setProjects;
		setProjects([...projects, project]);
	};
}

export const useApiStore = create(
	persist<ApiStore>(
		(set, get) => ({
			addProject: addProject(set, get),
			projects: [],
			setProjects: setProjects(set, get),
			setToken: setToken(set, get),
			setUser: setUser(set, get),
			token: null,
			user: null,
		}),
		{ name: 'api-store', storage: createJSONStorage(() => sessionStorage) },
	),
);

export const useSetToken = () => useApiStore((s) => s.setToken);
export const useToken = () => useApiStore((s) => s.token);

export const useSetUser = () => useApiStore((s) => s.setUser);
export const useUser = () => useApiStore((s) => s.user);
export const useAddProject = () => useApiStore((s) => s.addProject);
export const useSetProjects = () => useApiStore((s) => s.setProjects);
export const useProjects = () => useApiStore((s) => s.projects);
