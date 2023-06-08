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
import {
	FlowStore,
	useDesignCanvasStore,
} from '@/hooks/use-design-canvas-store';
import { useWindowsDimensions } from '@/hooks/use-window-dimensions';

export interface FlowProps {
	connectionMode: ConnectionMode;
	dndRef: (element: HTMLDivElement) => void;
	isExpandedNode: boolean;
	isFullWidth: boolean;
	setReactFlowInstance: (reactFlowInstance: ReactFlowInstance) => void;
	showBackground: boolean;
}

export const flowStateSelector = (state: FlowStore) => ({
	nodes: state.nodes,
	edges: state.edges,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onEdgeUpdate: state.onEdgeUpdate,
	onConnect: state.onConnect,
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
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		onEdgeUpdate,
		onConnect,
	} = useDesignCanvasStore(flowStateSelector, shallow);

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
				onConnect={onConnect}
				onEdgeUpdate={onEdgeUpdate}
				onEdgesChange={onEdgesChange}
				onInit={setReactFlowInstance}
				onNodesChange={onNodesChange}
				proOptions={{ hideAttribution: true }}
				snapToGrid={true}
			>
				<Controls className="bg-accent focus:bg-accent-content border-black" />
				{showBackground && (
					<Background
						variant={BackgroundVariant.Dots}
						color={backgroundColor}
						size={1.5}
					/>
				)}
			</ReactFlow>
		</div>
	);
}
