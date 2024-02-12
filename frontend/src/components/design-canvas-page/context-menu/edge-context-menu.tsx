import {
	ArrowPathIcon,
	ChevronRightIcon,
	TrashIcon,
} from '@heroicons/react/24/solid';
import { Position } from '@reactflow/core';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { EdgeType } from 'shared/constants';
import { shallow } from 'zustand/shallow';

import { EdgeTypeToEdgeComponentMap } from '@/components/design-canvas-page/constants';
import {
	ContextMenuStore,
	useCloseContextMenu,
	useContextMenuStore,
} from '@/stores/context-menu-store';
import { useDeleteEdge, useEdges, useUpdateEdge } from '@/stores/design-store';
import { handleChange } from '@/utils/helpers';

export function EdgeTypeDropdown({
	onClickHandler,
	currentEdgeType,
}: {
	currentEdgeType: EdgeType;
	onClickHandler: (edgeType: EdgeType) => void;
}) {
	const { t } = useTranslation('edges');
	return (
		<div
			className="elevation-15 dropdown dropdown-right dropdown-open"
			data-testid="custom-edge-context-menu::shape-dropdown"
		>
			<ul className="dropdown-content ml-14 border-2 border-neutral z-30 flex flex-wrap w-40 shadow bg-base-100 rounded-box">
				{Object.entries(EdgeTypeToEdgeComponentMap).map(
					([edgeType, Component], i) => (
						<div key={i} className="tooltip" data-tip={t(edgeType)}>
							<li
								data-testid={`${edgeType}-dropdown-component`}
								onClick={() => {
									onClickHandler(edgeType as EdgeType);
								}}
								className="text-primary-content p-2 w-16 h-16 mx-auto"
							>
								<svg
									className={`btn w-14 h-10  ${
										(edgeType as EdgeType) ===
											currentEdgeType &&
										'b-2 border-accent btn-disabled'
									}`}
								>
									<Component
										id={`${edgeType}-component-${i}`}
										source="a"
										target="b"
										interactionWidth={0}
										style={{
											color: 'currentColor',
											height: 5,
											margin: 0,
											padding: 0,
											width: 5,
										}}
										sourceX={0}
										sourceY={20}
										targetX={20}
										targetY={5}
										sourcePosition={Position.Right}
										targetPosition={Position.Left}
									/>
								</svg>
							</li>
						</div>
					),
				)}
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
	const deleteEdge = useDeleteEdge();
	const edge = useEdges().find((edge) => edge.id === itemId)!;

	const [isEdgeTypeDropdownOpen, setIsEdgeTypeDropdownOpen] = useState(false);

	return (
		<>
			<li
				className="border-b-2 p-1 border-accent border-opacity-30"
				data-testid="custom-edge-context-menu"
			>
				<button
					data-testid="custom-edge-context-menu::edge-type-menu-btn"
					className="btn btn-sm btn-ghost normal-case w-full justify-start items-center"
					onClick={handleChange(() => {
						setIsEdgeTypeDropdownOpen(!isEdgeTypeDropdownOpen);
					}, true)}
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
							currentEdgeType={edge.data!.edgeType}
						/>
					)}
					<ChevronRightIcon className="h-3 ml-2" />
				</button>
			</li>
			<li className="p-1">
				<button
					data-testid="custom-edge-context-menu::delete-edge-btn"
					className="btn btn-sm btn-ghost normal-case w-full justify-start"
					onClick={handleChange(() => {
						deleteEdge(itemId!);
						closeContextMenu();
					})}
				>
					<span className="flex gap-2 items-center">
						<TrashIcon className="h-4" />
						<span>{t('deleteEdge')}</span>
					</span>
				</button>
			</li>
		</>
	);
}
