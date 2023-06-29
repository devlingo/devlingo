import { CustomNodeContextMenu } from '@/components/design-canvas-page/context-menu/custom-node-context-menu';
import { ContextMenuType } from '@/constants/context-menu.constants';
import {
	useContextMenuLocation,
	useContextMenuType,
} from '@/stores/context-menu-store';

export function ContextMenu() {
	const menuType = useContextMenuType();
	const location = useContextMenuLocation();

	const containerStyle = {
		left: location?.x ?? 0,
		top: location?.y ?? 0,
	};

	return (
		<div
			data-testid="context-menu-container"
			className="absolute dropdown"
			style={containerStyle}
		>
			<ul className="p-3 shadow z-[1] bg-base-200 border-neutral-focus border rounded">
				{menuType === ContextMenuType.CustomNode && (
					<CustomNodeContextMenu />
				)}
			</ul>
		</div>
	);
}
