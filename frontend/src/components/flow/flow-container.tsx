import { ReactFlowInstance } from '@reactflow/core';
import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	BackgroundVariant,
	ConnectionMode,
	Controls,
	Edge,
	Node,
	ReactFlow,
	ReactFlowProvider,
	updateEdge,
} from 'reactflow';

import { HttpRestEdge } from '@/components/flow/edges/http-rest-edge';
import { NodeWithIcon } from '@/components/flow/nodes/node-with-icon';

const nodeTypes = {
	NodeWithIcon,
};

const edgeTypes = {
	HttpRestEdge,
};

export function FlowContainer({
	backgroundVariant,
	color,
	connectionMode,
	edges,
	nodes,
	setEdges,
	setNodes,
	setReactFlowInstance,
}: {
	backgroundVariant: BackgroundVariant;
	color: string;
	connectionMode: ConnectionMode;
	edges: Edge[];
	nodes: Node[];
	setEdges: (edges: Edge[] | ((values: any) => Edge[])) => void;
	setNodes: (nodes: Node[] | ((values: any) => Node[])) => void;
	setReactFlowInstance: (reactFlowInstance: ReactFlowInstance) => void;
}) {
	return (
		<ReactFlowProvider>
			<ReactFlow
				edges={edges}
				edgeTypes={edgeTypes}
				snapToGrid
				fitView
				nodeTypes={nodeTypes}
				nodes={nodes}
				onConnect={(params) => {
					setEdges((els: Edge[]) => addEdge(params, els));
				}}
				onEdgesChange={(edgeChanges) => {
					setEdges(applyEdgeChanges(edgeChanges, edges));
				}}
				onNodesChange={(nodeChanges) => {
					setNodes(applyNodeChanges(nodeChanges, nodes));
				}}
				onEdgeUpdate={(oldEdge, newConnections) => {
					setEdges((els: Edge[]) =>
						updateEdge(oldEdge, newConnections, els),
					);
				}}
				onInit={setReactFlowInstance}
				proOptions={{ hideAttribution: true }}
				connectionMode={connectionMode}
			>
				<Controls className="bg-accent focus:bg-accent-content border-black" />
				<Background variant={backgroundVariant} color={color} />
			</ReactFlow>
		</ReactFlowProvider>
	);
}
