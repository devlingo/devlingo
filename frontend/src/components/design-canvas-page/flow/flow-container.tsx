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

import {
	ConnectionLine,
	HttpRestEdge,
} from '@/components/design-canvas-page/flow/edges';
import {
	ContainerNode,
	InternalNode,
	ServiceNode,
} from '@/components/design-canvas-page/flow/nodes';
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
	isExpandedNode: boolean;
	isFullWidth: boolean;
	setReactFlowInstance: (reactFlowInstance: ReactFlowInstance) => void;
	showBackground: boolean;
}

export const flowStateSelector = (state: FlowStore) => ({
	allEdges: state.allEdges,
	allNodes: state.allNodes,
	edges: state.edges,
	nodes: state.nodes,
	onConnect: state.onConnect,
	onEdgeUpdate: state.onEdgeUpdate,
	onEdgesChange: state.onEdgesChange,
	onNodesChange: state.onNodesChange,
	viewport: state.viewport,
});

const nodeTypes: Record<string, MemoExoticComponent<any>> = {
	ServiceNode: memo(ServiceNode),
	InternalNode: memo(InternalNode),
	ContainerNode: memo(ContainerNode),
};

const edgeTypes: Record<string, MemoExoticComponent<any>> = {
	HttpRestEdge: memo(HttpRestEdge),
};

export const calculateFlowHeight = (
	windowHeight: number,
	isExpandedNode: boolean,
): number => {
	const flowHeight =
		windowHeight -
		(isExpandedNode ? Dimensions.ThirtySix : Dimensions.Sixteen);

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
	isExpandedNode,
	dndRef,
	setReactFlowInstance,
	showBackground,
	currentDesign,
}: FlowProps) {
	const theme = useContext(ThemeContext);

	const {
		allNodes,
		allEdges,
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
		calculateFlowHeight(windowHeight, isExpandedNode),
	);
	const [flowWidth, setFlowWidth] = useState(
		calculateFlowWidth(windowWidth, isFullWidth),
	);

	useEffect(() => {
		setFlowHeight(calculateFlowHeight(windowHeight, isExpandedNode));
	}, [windowHeight, isExpandedNode]);

	useEffect(() => {
		setFlowWidth(calculateFlowWidth(windowWidth, isFullWidth));
	}, [windowWidth, isFullWidth]);

	const { isSaving, setLastChangeTimestamp } = useSaveDesign({
		saveCheckInterval: TimeUnit.OneSecondInMilliseconds,
		debounceThreshold: TimeUnit.OneSecondInMilliseconds * 3,
		saveDelay: TimeUnit.OneSecondInMilliseconds * 3,
		nodes: allNodes,
		edges: allEdges,
		viewport: getViewport(),
		currentDesign,
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
				proOptions={{ hideAttribution: true }}
				minZoom={0.1}
				snapToGrid={true}
				zoomOnScroll={false}
				zoomOnDoubleClick={false}
				zoomOnPinch={false}
			>
				<Controls className="bg-accent focus:bg-accent-content border-black" />
				{showBackground && (
					<Background
						variant={BackgroundVariant.Dots}
						color={theme.backgroundColor}
						size={1.5}
					/>
				)}
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
