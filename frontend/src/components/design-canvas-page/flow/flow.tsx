import { Background, BackgroundVariant } from '@reactflow/background';
import { Controls } from '@reactflow/controls';
import { ConnectionMode, ReactFlow, ReactFlowInstance } from '@reactflow/core';
import {
	memo,
	MemoExoticComponent,
	useContext,
	useEffect,
	useState,
} from 'react';
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
import { DEFAULT_FLOW_HEIGHT, Dimensions } from '@/constants';
import { ThemeContext } from '@/context';
import { FlowStore, useDesignCanvasStore } from '@/stores/design-store';
import { useWindowsDimensions } from '@/hooks/use-window-dimensions';
import { useSaveDesign } from '@/hooks/use-flow-save';
import { Panel, useReactFlow } from 'reactflow';
import { TimeUnit } from 'shared/constants';

export interface FlowProps {
	connectionMode: ConnectionMode;
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
	viewPort: state.viewPort,
});

const nodeTypes: Record<string, MemoExoticComponent<any>> = {
	ServiceNode: memo(ServiceNode),
	InternalNode: memo(InternalNode),
	ContainerNode: memo(ContainerNode),
};

const edgeTypes: Record<string, MemoExoticComponent<any>> = {
	HttpRestEdge: memo(HttpRestEdge),
};

const calculateFlowHeight = (
	windowHeight: number,
	isExpandedNode: boolean,
): number => {
	const flowHeight =
		windowHeight -
		(isExpandedNode ? Dimensions.ThirtySix : Dimensions.Sixteen);

	return flowHeight > 0 ? flowHeight : DEFAULT_FLOW_HEIGHT;
};

const calculateFlowWidth = (
	windowWidth: number,
	isFullWith: boolean,
): number => {
	const flowWidth =
		windowWidth - (isFullWith ? Dimensions.Twenty : Dimensions.Eighty);
	return flowWidth > 0 ? flowWidth : DEFAULT_FLOW_HEIGHT;
};

export function Flow({
	connectionMode,
	isFullWidth,
	isExpandedNode,
	dndRef,
	setReactFlowInstance,
	showBackground,
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
		viewPort,
	} = useDesignCanvasStore(flowStateSelector, shallow);

	const instance = useReactFlow();

	// theming
	const [backgroundColor, setBackgroundColor] = useState('yellow');

	useEffect(() => {
		/*
    We have to access the document to get the active theme css values.
    We access the 'secondary' color value using --s.
    */
		const root = document.querySelector(':root');
		const color = root && getComputedStyle(root).getPropertyValue('--s');
		setBackgroundColor(color ? `hsl(${color})` : 'yellow');
	}, [theme.currentTheme]);

	// flow container sizing
	const [windowHeight, windowWidth] = useWindowsDimensions();
	const [flowHeight, setFlowHeight] = useState(
		calculateFlowHeight(windowHeight, false),
	);
	const [flowWidth, setFlowWidth] = useState(
		calculateFlowWidth(windowWidth, false),
	);

	useEffect(() => {
		setFlowHeight(calculateFlowHeight(windowHeight, isExpandedNode));
	}, [windowHeight, isExpandedNode]);

	useEffect(() => {
		setFlowWidth(calculateFlowWidth(windowWidth, isFullWidth));
	}, [windowWidth, isFullWidth]);

	const { isSaving, setLastChangeTimestamp } = useSaveDesign({
		saveCheckInterval: TimeUnit.OneSecondInMilliseconds,
		debounceThreshold: TimeUnit.OneSecondInMilliseconds,
		nodes: allNodes,
		edges: allEdges,
		viewPort: instance.getViewport(),
	});

	const withSetSave = (handler: (...args: any[]) => void) => {
		return (...args: any[]) => {
			handler(...args);
			setLastChangeTimestamp(new Date().getTime());
		};
	};

	useEffect(() => {
		if (viewPort) {
			instance.setViewport(viewPort);
		}
	}, [viewPort]);

	return (
		<div
			ref={dndRef}
			style={{
				// NOTE: we are forced to pass style here because reactflow has issues with setting the container heights
				// using classes. These values are calculated in the parent to be responsive to window size changes.
				height: flowHeight,
				width: flowWidth,
			}}
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
				snapToGrid={true}
				zoomOnScroll={false}
				zoomOnDoubleClick={false}
				zoomOnPinch={false}
			>
				<Controls className="bg-accent focus:bg-accent-content border-black" />
				{showBackground && (
					<Background
						variant={BackgroundVariant.Dots}
						color={backgroundColor}
						size={1.5}
					/>
				)}
				<Panel position="bottom-right">
					<div
						className={`loading loading-lg loading-infinity transition-opacity ease-in-out duration-[3000ms] ${
							isSaving ? 'opacity-75' : 'opacity-0'
						}`}
					/>
				</Panel>
			</ReactFlow>
		</div>
	);
}
