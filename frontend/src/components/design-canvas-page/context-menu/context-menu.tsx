import { shallow } from 'zustand/shallow';

import { CustomNodeContextMenu } from '@/components/design-canvas-page/context-menu/custom-node-context-menu';
import { ContextMenuType } from '@/constants/context-menu.constants';
import {
	ContextMenuStore,
	useContextMenuStore,
} from '@/stores/context-menu-store';

export function ContextMenu() {
	const { menuType, position } = useContextMenuStore(
		(state: ContextMenuStore) => ({
			position: state.position,
			menuType: state.menuType,
		}),
		shallow,
	);

	return (
		<div
			data-testid="context-menu-container"
			className="absolute dropdown"
			style={{
				left: position?.x ?? 0,
				top: position?.y ?? 0,
			}}
		>
			<ul className="p-3 shadow z-10 bg-base-200 border-neutral-focus border-2 rounded">
				{menuType === ContextMenuType.CustomNode && (
					<CustomNodeContextMenu />
				)}
			</ul>
		</div>
	);
}
