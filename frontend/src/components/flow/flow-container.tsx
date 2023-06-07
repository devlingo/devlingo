import { ReactFlowInstance } from '@reactflow/core';
import { useEffect, useState } from 'react';
import { ConnectionMode } from 'reactflow';

import { Flow } from '@/components/flow/flow-canvas';
import { InternalFlowHeader } from '@/components/flow/internal-flow-header';
import { NodeForm } from '@/components/forms/node-form';
import { PromptContainer } from '@/components/prompt/prompt-container';
import { SideRail } from '@/components/side-menu/side-rail';
import {
	DEFAULT_FLOW_HEIGHT,
	NAV_BAR_HEIGHT_PIXELS,
	RAIL_WIDTH_PIXELS,
	REM,
} from '@/constants';
import { useBoundedDrop } from '@/hooks/use-bounded-drop';
import {
	useConfiguredNode,
	useExpandedNode,
	useInsertNode,
	useUnsetConfiguredNode,
} from '@/hooks/use-store';
import { useWindowsDimensions } from '@/hooks/use-window-dimensions';
import { createNode } from '@/utils/node';

const calculateFlowHeight = (
	windowHeight: number,
	isExpandedNode: boolean,
): number => {
	const flowHeight =
		windowHeight -
		(isExpandedNode
			? NAV_BAR_HEIGHT_PIXELS * 2 + REM
			: NAV_BAR_HEIGHT_PIXELS);

	return flowHeight > 0 ? flowHeight : DEFAULT_FLOW_HEIGHT;
};

const calculateFlowWidth = (
	windowWidth: number,
	isSideRailExpanded: boolean,
): number => {
	const flowWidth =
		windowWidth -
		(isSideRailExpanded ? RAIL_WIDTH_PIXELS * 2 : RAIL_WIDTH_PIXELS / 2);
	return flowWidth > 0 ? flowWidth : DEFAULT_FLOW_HEIGHT;
};

export function FlowContainer() {
	const insertNode = useInsertNode();
	const configuredNode = useConfiguredNode();
	const expandedNode = useExpandedNode();
	const unsetConfiguredNode = useUnsetConfiguredNode();

	/* Menu Display and flow dimensions */
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
	const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

	const [windowHeight, windowWidth] = useWindowsDimensions();
	const [flowHeight, setFlowHeight] = useState(
		calculateFlowHeight(windowHeight, false),
	);
	const [flowWidth, setFlowWidth] = useState(
		calculateFlowWidth(windowWidth, false),
	);

	/*
	The displayNodes and displayEdges dictate which nodes and edges are displayed on the screen.
	They are separate from nodes and edges above because we have nested data.
	*/

	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance | null>(null);

	const [dndDropData, dndRef] = useBoundedDrop();

	// flow container sizing
	useEffect(() => {
		setFlowHeight(calculateFlowHeight(windowHeight, !!expandedNode));
	}, [windowHeight, expandedNode]);

	useEffect(() => {
		setFlowWidth(calculateFlowWidth(windowWidth, isSideMenuOpen));
	}, [windowWidth, isSideMenuOpen]);

	// node expansion

	// drag and drop
	useEffect(() => {
		if (dndDropData && reactFlowInstance) {
			const { nodeType, x, y } = dndDropData;

			insertNode(
				createNode({
					position: reactFlowInstance.project({ x, y }),
					data: {
						nodeType,
						formData: { nodeName: 'Unnamed' },
					},
				}),
			);
		}
	}, [dndDropData, reactFlowInstance]);

	// handling AI prompt sending

	return (
		<main className="h-full w-full flex justify-between">
			<PromptContainer
				closePromptModal={() => {
					setIsPromptModalOpen(false);
				}}
				isPromptModalOpen={isPromptModalOpen}
			/>

			<SideRail
				isMenuOpen={isSideMenuOpen}
				setIsMenuOpen={setIsSideMenuOpen}
				togglePromptModal={() => {
					setIsPromptModalOpen(!isPromptModalOpen);
				}}
			/>
			<div
				className={`h-full transition-all duration-300 ease-in-out ${
					expandedNode
						? 'bg-base-100 rounded border-2 border-neutral'
						: 'bg-base-300'
				} ${isSideMenuOpen ? 'shrink' : 'grow'}`}
			>
				{expandedNode && <InternalFlowHeader {...expandedNode.data} />}
				{flowHeight && windowWidth && (
					<Flow
						connectionMode={ConnectionMode.Loose}
						dndRef={dndRef}
						containerHeight={flowHeight}
						containerWidth={flowWidth}
						setReactFlowInstance={setReactFlowInstance}
						showBackground={!expandedNode}
					/>
				)}
			</div>
			{configuredNode && (
				<div className="absolute inset-1 w-5/10 h-full z-10 flex justify-center">
					<NodeForm
						closeMenuHandler={() => {
							unsetConfiguredNode();
						}}
					/>
				</div>
			)}
		</main>
	);
}
