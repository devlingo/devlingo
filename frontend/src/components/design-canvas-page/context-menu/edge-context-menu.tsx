import { ArrowPathIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { shallow } from 'zustand/shallow';

import {
	ContextMenuStore,
	useCloseContextMenu,
	useContextMenuStore,
} from '@/stores/context-menu-store';
import { EdgeType } from 'shared/constants';
import { useState } from 'react';
import { handleChange } from '@/utils/helpers';
import { useUpdateEdge } from '@/stores/design-store';

export function EdgeTypeDropdown({
	onClickHandler,
}: {
	onClickHandler: (edgeType: EdgeType) => void;
}) {
	const { t } = useTranslation('shapes');

	return (
		<div
			className="elevation-15 dropdown dropdown-right dropdown-open"
			data-testid="custom-node-context-menu::shape-dropdown"
		>
			<ul className="dropdown-content ml-14 border-2 border-neutral z-30 flex flex-wrap w-72 shadow bg-base-100 rounded-box">
				{Object.values(EdgeType).map((edgeType, i) => (
					<div key={i} className="tooltip" data-tip={t(edgeType)}>
						<li
							data-testid={`${edgeType}-dropdown-component`}
							onClick={() => onClickHandler(edgeType as EdgeType)}
							className="text-primary-content p-2"
						>
							{edgeType}
						</li>
					</div>
				))}
			</ul>
		</div>
	);
}

export function EdgeContextMenu() {
	const { t } = useTranslation('contextMenu');

	const { itemId } = useContextMenuStore(
		(state: ContextMenuStore) => ({ itemId: state.itemId }),
		shallow,
	);

	const closeContextMenu = useCloseContextMenu();
	const updateEdge = useUpdateEdge();

	const [isEdgeTypeDropdownOpen, setIsEdgeTypeDropdownOpen] = useState(false);

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
						() =>
							setIsEdgeTypeDropdownOpen(!isEdgeTypeDropdownOpen),
						true,
					)}
				>
					<span className="flex gap-2 items-center">
						<ArrowPathIcon className="h-4" />
						<span>{t('changeShape')}</span>
					</span>
					{isEdgeTypeDropdownOpen && (
						<EdgeTypeDropdown
							onClickHandler={(edgeType) => {
								updateEdge(itemId!, { edgeType });
								closeContextMenu();
							}}
						/>
					)}
					<ChevronRightIcon className="h-3 ml-2" />
				</button>
			</li>
		</>
	);
}
