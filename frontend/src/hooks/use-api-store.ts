import { User } from '@prisma/client';
import {
	DesignResponseData,
	ProjectResponseData,
	VersionResponse,
} from 'shared/types';
import { create, GetState, SetState } from 'zustand';

export interface ApiStore {
	currentDesign: DesignResponseData | null;
	currentVersion: VersionResponse | null;
	projects: ProjectResponseData[];
	setCurrentDesign: (design: DesignResponseData | null) => void;
	setCurrentVersion: (version: VersionResponse | null) => void;
	setProjects: (projects: ProjectResponseData[]) => void;
	setUser: (user: User) => void;
	user: User | null;
}

export function setUser(set: SetState<ApiStore>, _: GetState<ApiStore>) {
	return (user: User) => {
		set({ user });
	};
}

export function setProjects(set: SetState<ApiStore>, _: GetState<ApiStore>) {
	return (projects: ProjectResponseData[]) => {
		set({
			projects: projects.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime(),
			),
		});
	};
}

export function setCurrentDesign(
	set: SetState<ApiStore>,
	_: GetState<ApiStore>,
) {
	return (design: DesignResponseData | null) => {
		set({ currentDesign: design });
	};
}

export function setCurrentVersion(
	set: SetState<ApiStore>,
	_: GetState<ApiStore>,
) {
	return (version: VersionResponse | null) => {
		set({ currentVersion: version });
	};
}

export const useApiStore = create<ApiStore>((set, get) => ({
	currentDesign: null,
	currentVersion: null,
	projects: [],
	setCurrentDesign: setCurrentDesign(set, get),
	setCurrentVersion: setCurrentVersion(set, get),
	setProjects: setProjects(set, get),
	setUser: setUser(set, get),
	user: null,
}));

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

export const useSetCurrentVersion = () =>
	useApiStore((s) => s.setCurrentVersion);

export const useCurrentVersion = () => useApiStore((s) => s.currentVersion);
