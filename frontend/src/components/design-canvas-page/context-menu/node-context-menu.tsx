import {
	ArrowPathIcon,
	PencilIcon,
	TrashIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { MouseEvent, useState } from 'react';
import { NodeShape } from 'shared/constants';
import { shallow } from 'zustand/shallow';

import { ShapeComponents } from '@/components/design-canvas-page/shapes';
import {
	ContextMenuStore,
	useCloseContextMenu,
	useContextMenuStore,
} from '@/stores/context-menu-store';
import {
	useDeleteNode,
	useNodes,
	useSetConfiguredNode,
	useUpdateNode,
} from '@/stores/design-store';

export function NodeShapeDropdown({
	onClickHandler,
}: {
	onClickHandler: (shape: NodeShape) => void;
}) {
	return (
		<div className="dropdown dropdown-right dropdown-open">
			<ul className="dropdown-content z-30 flex flex-wrap w-80 p-2 shadow bg-base-100 rounded-box">
				{Object.entries(ShapeComponents).map(
					([shape, Component], i) => (
						<li
							key={i}
							data-testid={`${shape}-dropdown-component`}
							onClick={() => onClickHandler(shape as NodeShape)}
							className="text-primary-content p-2"
						>
							<Component
								height={20}
								width={20}
								className="w-full h-full"
							/>
						</li>
					),
				)}
			</ul>
		</div>
	);
}

export function NodeContextMenu() {
	const { t } = useTranslation('contextMenu');

	const { itemId } = useContextMenuStore(
		(state: ContextMenuStore) => ({ itemId: state.itemId }),
		shallow,
	);

	const deleteNode = useDeleteNode();
	const setConfiguredNode = useSetConfiguredNode();
	const closeContextMenu = useCloseContextMenu();
	const updateNode = useUpdateNode();
	const node = useNodes().find((n) => n.id === itemId)!;

	const [isShapeDropdownOpen, setIsShapeDropdownOpen] = useState(false);

	const withCloseMenu = (cb: () => void) => {
		return (e: MouseEvent) => {
			e.stopPropagation();
			cb();
			closeContextMenu();
		};
	};

	return (
		<>
			<li>
				<button
					data-testid="context-menu-rename-node-btn"
					className="btn btn-sm btn-ghost normal-case w-full justify-start"
					onClick={withCloseMenu(() => setConfiguredNode(node.id))}
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
					onClick={(e: MouseEvent) => {
						e.stopPropagation();
						setIsShapeDropdownOpen(true);
					}}
				>
					<span className="flex gap-2 items-center">
						<ArrowPathIcon className="h-4" />
						<span>{t('changeShape')}</span>
					</span>
					{isShapeDropdownOpen && (
						<NodeShapeDropdown
							onClickHandler={(shape) => {
								updateNode(itemId!, { shape });
								closeContextMenu();
							}}
						/>
					)}
				</button>
			</li>
			<li>
				<button
					data-testid="context-menu-delete-node-btn"
					className="btn btn-sm btn-ghost normal-case w-full justify-start"
					onClick={withCloseMenu(() => deleteNode(node.id))}
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
