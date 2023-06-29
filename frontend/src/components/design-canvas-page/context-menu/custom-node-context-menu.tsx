import { useTranslation } from 'next-i18next';

import {
	useContextMenuNodeData,
	useContextMenuStore,
} from '@/stores/context-menu-store';
import { useHandleNodeDelete } from '@/stores/design-store';

export function CustomNodeContextMenu() {
	const { t } = useTranslation('contextMenu');
	const handleNodeDelete = useHandleNodeDelete();
	const nodeData = useContextMenuNodeData<string>();
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

	function onDeleteNode() {
		handleNodeDelete(nodeData);
		closeContextMenu();
	}

	return (
		<>
			<li data-testid="custom-node-context-menu">
				<button
					data-testid="delete-node-context-item"
					onClick={onDeleteNode}
				>
					{t('deleteNode')}
				</button>
			</li>
		</>
	);
}
