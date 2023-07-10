import { create } from 'zustand';

import { ContextMenuType } from '@/constants/context-menu.constants';

export interface ContextMenuStore {
	isClicked: boolean;
	position: {
		x: number;
		y: number;
	} | null;
	nodeId: string | null;
	menuType: ContextMenuType | null;
	setIsClicked: (isClicked: boolean) => void;
	setPosition: (position: { x: number; y: number } | null) => void;
	setNodeId: (nodeData: string | null) => void;
	setContextMenuType: (menuType: ContextMenuType | null) => void;
}

export const useContextMenuStore = create<ContextMenuStore>((set) => ({
	isClicked: false,
	position: null,
	nodeId: null,
	menuType: null,
	setIsClicked: (isClicked: boolean) => {
		set({ isClicked });
	},
	setPosition: (position: { x: number; y: number } | null) => {
		set({ position });
	},
	setNodeId: (nodeId: string | null) => {
		set({ nodeId });
	},
	setContextMenuType: (menuType: ContextMenuType | null) => {
		set({ menuType });
	},
}));

export const useSetNodeId = () => useContextMenuStore((s) => s.setNodeId);
export const useNodeId = () => useContextMenuStore((s) => s.nodeId);

export const useSetContextMenuType = () =>
	useContextMenuStore((s) => s.setContextMenuType);
export const useContextMenuType = () => useContextMenuStore((s) => s.menuType);

export const useContextMenuLocation = () =>
	useContextMenuStore((s) => s.position);
