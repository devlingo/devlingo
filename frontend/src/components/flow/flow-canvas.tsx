import { Background, BackgroundVariant } from '@reactflow/background';
import { Controls } from '@reactflow/controls';
import {
	ConnectionMode,
	ReactFlow,
	ReactFlowInstance,
	ReactFlowProvider,
} from '@reactflow/core';
import {
	memo,
	MemoExoticComponent,
	useContext,
	useEffect,
	useState,
} from 'react';
import { shallow } from 'zustand/shallow';

import { ConnectionLine, HttpRestEdge } from '@/components/flow/edges';
import {
	ContainerNode,
	InternalNode,
	ServiceNode,
} from '@/components/flow/nodes';
import { ThemeContext } from '@/context';
import { FlowStoreState, useStore } from '@/hooks/use-store';

export interface FlowProps {
	connectionMode: ConnectionMode;
	containerHeight: number;
	containerWidth: number;
	dndRef: (element: HTMLDivElement) => void;
	setReactFlowInstance: (reactFlowInstance: ReactFlowInstance) => void;
	showBackground: boolean;
}

export const flowStateSelector = (state: FlowStoreState) => ({
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

export function Flow({
	connectionMode,
	containerHeight,
	containerWidth,
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
	} = useStore(flowStateSelector, shallow);

	const [backgroundColor, setBackgroundColor] = useState('yellow');

	useEffect(() => {
		/*
    We have to access the document to get the active theme css values.
    We access the 'secondary' color value using --s.
    * */
		const root = document.querySelector(':root');
		const color = root && getComputedStyle(root).getPropertyValue('--s');
		setBackgroundColor(color ? `hsl(${color})` : 'yellow');
	}, [theme.currentTheme]);

	return (
		<ReactFlowProvider>
			<div
				ref={dndRef}
				style={{
					// NOTE: we are forced to pass style here because reactflow has issues with setting the container heights
					// using classes. These values are calculated in the parent to be responsive to window size changes.
					height: containerHeight,
					width: containerWidth,
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
		</ReactFlowProvider>
	);
}
