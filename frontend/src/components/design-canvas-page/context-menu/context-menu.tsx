import { shallow } from 'zustand/shallow';

import { EdgeContextMenu } from '@/components/design-canvas-page/context-menu/edge-context-menu';
import { NodeContextMenu } from '@/components/design-canvas-page/context-menu/node-context-menu';
import { ContextMenuType } from '@/constants/context-menu.constants';
import {
	ContextMenuStore,
	useContextMenuStore,
} from '@/stores/context-menu-store';

const contextMenuComponents: Record<ContextMenuType, React.FC<any>> = {
	[ContextMenuType.CustomNode]: NodeContextMenu,
	[ContextMenuType.CustomEdge]: EdgeContextMenu,
};

export function ContextMenu() {
	const { isContextMenuOpen, menuType, position } = useContextMenuStore(
		(state: ContextMenuStore) => ({
			position: state.position,
			menuType: state.menuType,
			isContextMenuOpen: state.isContextMenuOpen,
		}),
		shallow,
	);

	if (!menuType) {
		return null;
	}

	const MenuComponent = contextMenuComponents[menuType];

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
			<ul className="list-none m-0 p-1 menu shadow z-10 bg-base-200 border-neutral-focus elevation-8 rounded-box">
				<MenuComponent />
			</ul>
		</div>
	);
}
