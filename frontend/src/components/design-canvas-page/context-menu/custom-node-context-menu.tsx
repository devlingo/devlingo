import {
	ArrowPathIcon,
	PencilIcon,
	TrashIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { NodeShape } from 'shared/constants';

import {
	useContextMenuStore,
	useNodeId,
	useSetContextMenuType,
	useSetNodeId,
} from '@/stores/context-menu-store';
import {
	useDeleteNode,
	useNodes,
	useSetConfiguredNode,
	useUpdateNode,
} from '@/stores/design-store';

export function CustomNodeContextMenu() {
	const { t } = useTranslation('contextMenu');

	const deleteNode = useDeleteNode();
	const nodeId = useNodeId()!;
	const setConfiguredNode = useSetConfiguredNode();
	const setContextMenuType = useSetContextMenuType();
	const setIsClicked = useContextMenuStore((state) => state.setIsClicked);
	const setNodeId = useSetNodeId();
	const setPosition = useContextMenuStore((state) => state.setPosition);
	const updateNode = useUpdateNode();
	const node = useNodes().find((n) => n.id === nodeId)!;

	const closeContextMenu = () => {
		setIsClicked(false);
		setPosition(null);
		setNodeId(null);
		setContextMenuType(null);
	};

	const handleUpdateNodeShape = (): void => {
		const shapes = Object.values(NodeShape);
		const shapeIndex = shapes.findIndex((s) => node.data.shape === s);

		const nextShape =
			shapes[shapeIndex === shapes.length - 1 ? 0 : shapeIndex + 1];
		updateNode(nodeId, { shape: nextShape });
		closeContextMenu();
	};

	return (
		<>
			<li>
				<button
					data-testid="context-menu-rename-node-btn"
					className="btn btn-sm btn-ghost normal-case w-full justify-start"
					onClick={() => {
						setConfiguredNode(node.id);
						closeContextMenu();
					}}
				>
					<span className="flex gap-2 items-center">
						<PencilIcon className="h-4" />
						<span>{t('renameNode')}</span>
					</span>
				</button>
			</li>
			<li>
				<button
					data-testid="context-menu-shape-menu-btn"
					className="btn btn-sm btn-ghost normal-case w-full justify-start"
					onClick={handleUpdateNodeShape}
				>
					<span className="flex gap-2 items-center">
						<ArrowPathIcon className="h-4" />
						<span>{t('changeShape')}</span>
					</span>
				</button>
			</li>
			<li data-testid="custom-node-context-menu">
				<button
					data-testid="context-menu-delete-node-btn"
					className="btn btn-sm btn-ghost normal-case w-full justify-start"
					onClick={() => {
						deleteNode(node.id);
						closeContextMenu();
					}}
				>
					<span className="flex gap-2 items-center">
						<TrashIcon className="h-4" />
						<span>{t('deleteNode')}</span>
					</span>
				</button>
			</li>
		</>
	);
}
