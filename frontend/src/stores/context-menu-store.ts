import { create } from 'zustand';

import { ContextMenuType } from '@/constants/context-menu.constants';

export interface OpenContextMenuParams {
	itemId: string;
	menuType: ContextMenuType;
	position: { x: number; y: number };
}

export interface ContextMenuStore {
	closeContextMenu: () => void;
	isContextMenuOpen: boolean;
	itemId: string | null;
	menuType: ContextMenuType | null;
	openContextMenu: (params: OpenContextMenuParams) => void;
	position: {
		x: number;
		y: number;
	} | null;
}

export const useContextMenuStore = create<ContextMenuStore>((set) => ({
	closeContextMenu: () => {
		set({
			isContextMenuOpen: false,
			itemId: null,
			menuType: null,
			position: null,
		});
	},
	isContextMenuOpen: false,
	itemId: null,
	menuType: null,
	openContextMenu: (params: {
		itemId: string;
		menuType: ContextMenuType;
		position: { x: number; y: number };
	}) => {
		set({ ...params, isContextMenuOpen: true });
	},
	position: null,
}));

export const useOpenContextMenu = () =>
	useContextMenuStore((state) => state.openContextMenu);
export const useCloseContextMenu = () =>
	useContextMenuStore((state) => state.closeContextMenu);
