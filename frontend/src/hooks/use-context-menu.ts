import { MouseEvent, useEffect } from 'react';

import { ContextMenuType } from '@/constants/context-menu.constants';
import { useContextMenuStore } from '@/stores/context-menu-store';

export const useContextMenu = <T>(menuType: ContextMenuType, nodeData: T) => {
	const setIsClicked = useContextMenuStore((state) => state.setIsClicked);
	const setPosition = useContextMenuStore((state) => state.setPosition);
	const setNodeData = useContextMenuStore((state) => state.setNodeData);
	const setContextMenuType = useContextMenuStore(
		(state) => state.setContextMenuType,
	);

	function closeContextMenu() {
		setIsClicked(false);
		setPosition(null);
		setNodeData(null);
		setContextMenuType(null);
	}

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
		setNodeData(nodeData);
		setContextMenuType(menuType);
	};
};
