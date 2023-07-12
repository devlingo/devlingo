import {
	ArrowPathIcon,
	ChevronRightIcon,
	PencilIcon,
	TrashIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
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
import { handleChange } from '@/utils/helpers';

export function NodeShapeDropdown({
	onClickHandler,
}: {
	onClickHandler: (shape: NodeShape) => void;
}) {
	const { t } = useTranslation('shapes');

	return (
		<div
			className="elevation-15 dropdown dropdown-right dropdown-open"
			data-testid="custom-node-context-menu::shape-dropdown"
		>
			<ul className="dropdown-content ml-14 border-2 border-neutral z-30 flex flex-wrap w-72 shadow bg-base-100 rounded-box">
				{Object.entries(ShapeComponents).map(
					([shape, Component], i) => (
						<div key={i} className="tooltip" data-tip={t(shape)}>
							<li
								data-testid={`${shape}-dropdown-component`}
								onClick={() =>
									onClickHandler(shape as NodeShape)
								}
								className="text-primary-content p-2"
							>
								<Component
									height={20}
									width={20}
									className="w-full h-full"
								/>
							</li>
						</div>
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

	return (
		<>
			<li
				className="border-b-2 p-1 border-accent border-opacity-30"
				data-testid="custom-node-context-menu"
			>
				<button
					data-testid="custom-node-context-menu::shape-menu-btn"
					className="btn btn-sm btn-ghost normal-case w-full justify-start items-center"
					onClick={handleChange(
						() => setIsShapeDropdownOpen(!isShapeDropdownOpen),
						true,
					)}
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
					<ChevronRightIcon className="h-3 ml-2" />
				</button>
			</li>
			<li className="border-b-2 p-1 border-accent border-opacity-30">
				<button
					data-testid="custom-node-context-menu::rename-node-btn"
					className="btn btn-sm btn-ghost normal-case w-full justify-start"
					onClick={handleChange(() => {
						setConfiguredNode(node.id);
						closeContextMenu();
					})}
				>
					<span className="flex gap-2 items-center">
						<PencilIcon className="h-4" />
						<span>{t('renameNode')}</span>
					</span>
				</button>
			</li>

			<li className="p-1">
				<button
					data-testid="custom-node-context-menu::delete-node-btn"
					className="btn btn-sm btn-ghost normal-case w-full justify-start"
					onClick={handleChange(() => {
						deleteNode(node.id);
						closeContextMenu();
					})}
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
