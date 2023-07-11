import { create } from 'zustand';

import { ContextMenuType } from '@/constants/context-menu.constants';

export interface OpenContextMenuParams {
	itemId: string;
	menuType: ContextMenuType;
	position: { x: number; y: number };
}

export interface ContextMenuStore {
	isContextMenuOpen: boolean;
	position: {
		x: number;
		y: number;
	} | null;
	itemId: string | null;
	menuType: ContextMenuType | null;
	openContextMenu: (params: OpenContextMenuParams) => void;
	closeContextMenu: () => void;
}

export const useContextMenuStore = create<ContextMenuStore>((set) => ({
	isContextMenuOpen: false,
	position: null,
	itemId: null,
	menuType: null,
	openContextMenu: (params: {
		itemId: string;
		menuType: ContextMenuType;
		position: { x: number; y: number };
	}) => {
		set({ ...params, isContextMenuOpen: true });
	},
	closeContextMenu: () => {
		set({
			isContextMenuOpen: false,
			position: null,
			itemId: null,
			menuType: null,
		});
	},
}));

export const useOpenContextMenu = () =>
	useContextMenuStore((state) => state.openContextMenu);
export const useCloseContextMenu = () =>
	useContextMenuStore((state) => state.closeContextMenu);
