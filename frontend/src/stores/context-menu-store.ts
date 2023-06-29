import { create } from 'zustand';

import { ContextMenuType } from '@/constants/context-menu.constants';

export interface ContextMenuStore<T> {
	isClicked: boolean;
	position: {
		x: number;
		y: number;
	} | null;
	nodeData: T;
	menuType: ContextMenuType | null;
	setIsClicked: (isClicked: boolean) => void;
	setPosition: (position: { x: number; y: number } | null) => void;
	setNodeData: (nodeData: T) => void;
	setContextMenuType: (menuType: ContextMenuType | null) => void;
}

const INITIAL_STATE: Pick<
	ContextMenuStore<any>,
	'isClicked' | 'position' | 'nodeData' | 'menuType'
> = {
	isClicked: false,
	position: null,
	nodeData: null,
	menuType: null,
};

export const useContextMenuStore = create<ContextMenuStore<any>>((set) => ({
	...INITIAL_STATE,
	setIsClicked: (isClicked: boolean) => {
		set({ isClicked });
	},
	setPosition: (position: { x: number; y: number } | null) => {
		set({ position });
	},
	setNodeData: <T>(nodeData: T) => {
		set({ nodeData });
	},
	setContextMenuType: (menuType: ContextMenuType | null) => {
		set({ menuType });
	},
}));

export const useContextMenuNodeData = <T>() =>
	useContextMenuStore((s) => s.nodeData as T);

export const useContextMenuType = () => useContextMenuStore((s) => s.menuType);

export const useContextMenuLocation = () =>
	useContextMenuStore((s) => s.position);
