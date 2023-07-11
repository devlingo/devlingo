import { shallow } from 'zustand/shallow';

import { NodeContextMenu } from '@/components/design-canvas-page/context-menu/node-context-menu';
import { ContextMenuType } from '@/constants/context-menu.constants';
import {
	ContextMenuStore,
	useContextMenuStore,
} from '@/stores/context-menu-store';

export function ContextMenu() {
	const { isContextMenuOpen, menuType, position } = useContextMenuStore(
		(state: ContextMenuStore) => ({
			position: state.position,
			menuType: state.menuType,
			isContextMenuOpen: state.isContextMenuOpen,
		}),
		shallow,
	);

	return (
		<div
			data-testid="context-menu-container"
			className="absolute"
			style={{
				left: position?.x ?? 0,
				top: position?.y ?? 0,
				display: isContextMenuOpen ? 'block' : 'none',
			}}
		>
			<ul className="p-3 menu shadow z-10 bg-base-200 border-neutral-focus border-2 rounded">
				{menuType === ContextMenuType.CustomNode && <NodeContextMenu />}
			</ul>
		</div>
	);
}
