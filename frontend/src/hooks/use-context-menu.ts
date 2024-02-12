import { MouseEvent, useEffect } from 'react';

import { ContextMenuType } from '@/constants/context-menu.constants';
import {
	useCloseContextMenu,
	useOpenContextMenu,
} from '@/stores/context-menu-store';

export const useContextMenu = (menuType: ContextMenuType, itemId: string) => {
	const closeContextMenu = useCloseContextMenu();
	const openContextMenu = useOpenContextMenu();

	useEffect(() => {
		document.addEventListener('click', closeContextMenu);
		return () => {
			document.removeEventListener('click', closeContextMenu);
		};
	}, []);

	return (e: MouseEvent) => {
		e.preventDefault();
		openContextMenu({
			itemId,
			menuType,
			position: {
				x: e.pageX,
				y: e.pageY,
			},
		});
	};
};
