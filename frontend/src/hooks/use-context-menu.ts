import { MouseEvent, useEffect } from 'react';

import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenuStore, useSetNodeId } from '@/stores/context-menu-store';

export const useContextMenu = (menuType: ContextMenuType, nodeId: string) => {
	const setIsClicked = useContextMenuStore((state) => state.setIsClicked);
	const setPosition = useContextMenuStore((state) => state.setPosition);
	const setNodeId = useSetNodeId();
	const setContextMenuType = useContextMenuStore(
		(state) => state.setContextMenuType,
	);

	const closeContextMenu = () => {
		setIsClicked(false);
		setPosition(null);
		setNodeId(null);
		setContextMenuType(null);
	};

	useEffect(() => {
		document.addEventListener('click', closeContextMenu);
		return () => {
			document.removeEventListener('click', closeContextMenu);
		};
	}, []);

	return (e: MouseEvent) => {
		e.preventDefault();
		setIsClicked(true);
		setPosition({
			x: e.pageX,
			y: e.pageY,
		});
		setNodeId(nodeId);
		setContextMenuType(menuType);
	};
};
