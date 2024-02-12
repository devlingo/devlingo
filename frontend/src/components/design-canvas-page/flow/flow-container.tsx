import {
	memo,
	MemoExoticComponent,
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	Background,
	BackgroundVariant,
	ConnectionMode,
	Controls,
	Panel,
	ReactFlow,
	ReactFlowInstance,
	useOnViewportChange,
	useReactFlow,
} from 'reactflow';
import { TimeUnit } from 'shared/constants';
import { DesignResponseData } from 'shared/types';
import { shallow } from 'zustand/shallow';

import { ConnectionLine } from '@/components/design-canvas-page/flow/connection-line';
import { CustomEdge } from '@/components/design-canvas-page/flow/custom-edge';
import { CustomNode } from '@/components/design-canvas-page/flow/custom-node';
import {
	DEFAULT_FLOW_HEIGHT,
	DEFAULT_FLOW_WIDTH,
	Dimensions,
} from '@/constants';
import { ThemeContext } from '@/context';
import { useSaveDesign } from '@/hooks/use-save-design';
import { useWindowsDimensions } from '@/hooks/use-window-dimensions';
import { FlowStore, useDesignCanvasStore } from '@/stores/design-store';

export interface FlowProps {
	connectionMode: ConnectionMode;
	currentDesign: DesignResponseData;
	dndRef: (element: HTMLDivElement) => void;
	isFullWidth: boolean;
	setReactFlowInstance: (reactFlowInstance: ReactFlowInstance) => void;
}

export const flowStateSelector = (state: FlowStore) => ({
	edges: state.edges,
	nodes: state.nodes,
	onConnect: state.onConnect,
	onEdgeUpdate: state.onEdgeUpdate,
	onEdgesChange: state.onEdgesChange,
	onNodesChange: state.onNodesChange,
	viewport: state.viewport,
});

const nodeTypes: Record<string, MemoExoticComponent<any>> = {
	CustomNode: memo(CustomNode),
};

const edgeTypes: Record<string, MemoExoticComponent<any>> = {
	CustomEdge: memo(CustomEdge),
};

export const calculateFlowHeight = (windowHeight: number): number => {
	const flowHeight = windowHeight - Dimensions.Sixteen;
	return flowHeight >= 0 ? flowHeight : DEFAULT_FLOW_HEIGHT;
};

export const calculateFlowWidth = (
	windowWidth: number,
	isFullWidth: boolean,
): number => {
	const flowWidth =
		windowWidth - (isFullWidth ? Dimensions.Twenty : Dimensions.Eighty);
	return flowWidth > 0 ? flowWidth : DEFAULT_FLOW_WIDTH;
};

export function FlowContainer({
	connectionMode,
	isFullWidth,
	dndRef,
	setReactFlowInstance,
	currentDesign,
}: FlowProps) {
	const theme = useContext(ThemeContext);

	const {
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		onEdgeUpdate,
		onConnect,
		viewport,
	} = useDesignCanvasStore(flowStateSelector, shallow);

	const { getViewport, zoomTo, setViewport } = useReactFlow();

	// flow container sizing
	const [windowHeight, windowWidth] = useWindowsDimensions();
	const [flowHeight, setFlowHeight] = useState(
		calculateFlowHeight(windowHeight),
	);
	const [flowWidth, setFlowWidth] = useState(
		calculateFlowWidth(windowWidth, isFullWidth),
	);

	useEffect(() => {
		setFlowHeight(calculateFlowHeight(windowHeight));
	}, [windowHeight]);

	useEffect(() => {
		setFlowWidth(calculateFlowWidth(windowWidth, isFullWidth));
	}, [windowWidth, isFullWidth]);

	const { isSaving, setLastChangeTimestamp } = useSaveDesign({
		currentDesign,
		debounceThreshold: TimeUnit.OneSecondInMilliseconds * 3,
		edges,
		nodes,
		saveCheckInterval: TimeUnit.OneSecondInMilliseconds,
		saveDelay: TimeUnit.OneSecondInMilliseconds * 3,
		viewport: getViewport(),
	});

	const withSetSave = (handler: (...args: any[]) => void) => {
		return (...args: any[]) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			handler(...args);
			setLastChangeTimestamp(Date.now());
		};
	};

	useEffect(() => {
		const { x, y, zoom } = getViewport();
		if (viewport.x !== x || viewport.y !== y || viewport.zoom !== zoom) {
			setViewport(viewport);
			zoomTo(viewport.zoom, {
				duration: TimeUnit.OneSecondInMilliseconds,
			});
		}
	}, [viewport]);

	useOnViewportChange({
		onChange: ({ x, y, zoom }) => {
			if (
				viewport.x !== x ||
				viewport.y !== y ||
				viewport.zoom !== zoom
			) {
				setLastChangeTimestamp(Date.now());
			}
		},
	});

	return (
		<div
			ref={dndRef}
			style={{
				// NOTE: we are forced to pass style here because reactflow has issues with setting the container heights
				// using classes. These values are calculated in the parent to be responsive to window size changes.
				height: flowHeight,
				width: flowWidth,
			}}
			data-testid="react-flow-container"
		>
			<ReactFlow
				connectionLineComponent={ConnectionLine}
				connectionMode={connectionMode}
				edgeTypes={edgeTypes}
				edges={edges}
				fitView={true}
				nodeTypes={nodeTypes}
				nodes={nodes}
				onConnect={withSetSave(onConnect)}
				onEdgeUpdate={withSetSave(onEdgeUpdate)}
				onEdgesChange={withSetSave(onEdgesChange)}
				onInit={setReactFlowInstance}
				onNodesChange={withSetSave(onNodesChange)}
				proOptions={{ account: 'paid-pro', hideAttribution: true }}
				minZoom={0.1}
				snapToGrid={true}
				zoomOnScroll={false}
				zoomOnDoubleClick={false}
				zoomOnPinch={false}
				elevateNodesOnSelect={true}
			>
				<Controls className="bg-accent focus:bg-accent-content border-black" />
				<Background
					variant={BackgroundVariant.Dots}
					color={theme.themeColors?.secondary ?? 'yellow'}
					size={1.5}
				/>
				<Panel position="bottom-right">
					<div
						className={`loading loading-lg loading-infinity transition-opacity ease-in-out duration-[3000ms] ${
							isSaving ? 'opacity-75' : 'opacity-0'
						}`}
						data-testid="save-design-loader"
					/>
				</Panel>
			</ReactFlow>
		</div>
	);
}
