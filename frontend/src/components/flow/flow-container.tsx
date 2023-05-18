import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ReactFlowInstance } from '@reactflow/core';
import { useTranslation } from 'next-i18next';
import {
	memo,
	MemoExoticComponent,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
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

import { TypeSVGMap } from '@/assets';
import { Drawer } from '@/components/drawer-menu/drawer';
import { MenuItem } from '@/components/drawer-menu/menu-item';
import { HttpRestEdge } from '@/components/flow/edges/http-rest-edge';
import { initialEdges, initialNodes } from '@/components/flow/initial-data';
import { InternalNode } from '@/components/flow/nodes/internal-node';
import { ServiceNode } from '@/components/flow/nodes/service-node';
import { NodeForm } from '@/components/forms/node-form';
import {
	FOOTER_HEIGHT_PIXELS,
	NAV_BAR_HEIGHT_PIXELS,
	REM,
	ServiceNodeType,
	TypeTagMap,
} from '@/constants';
import { InternalNodeData, ServiceNodeData } from '@/types';
import { NodeContext } from '@/utils/context';
import { useBoundedDrop, useWindowsDimensions } from '@/utils/hooks';
import { createNode } from '@/utils/node';

const calculateFlowHeight = (
	windowHeight: number,
	isExpandedNode: boolean,
): number => {
	const flowHeight =
		windowHeight - (NAV_BAR_HEIGHT_PIXELS + FOOTER_HEIGHT_PIXELS / 2);

	if (isExpandedNode) {
		return (
			flowHeight -
			NAV_BAR_HEIGHT_PIXELS -
			(FOOTER_HEIGHT_PIXELS - REM / 2)
		);
	}

	return flowHeight;
};

const nodeTypes: Record<string, MemoExoticComponent<any>> = {
	ServiceNode: memo(ServiceNode),
	InternalNode: memo(InternalNode),
};

const edgeTypes: Record<string, MemoExoticComponent<any>> = {
	HttpRestEdge: memo(HttpRestEdge),
};

interface FlowProps {
	connectionMode: ConnectionMode;
	displayEdges: Edge[];
	displayNodes: Node[];
	setDisplayEdges: (edges: Edge[] | ((values: any) => Edge[])) => void;
	setDisplayNodes: (nodes: Node[] | ((values: any) => Node[])) => void;
	setReactFlowInstance: (reactFlowInstance: ReactFlowInstance) => void;
	showBackground: boolean;
	minHeightPixels: number;
	minWidthPixels: number;
	ref: (element: HTMLDivElement) => void;
}

function Flow({
	connectionMode,
	displayEdges,
	displayNodes,
	setDisplayEdges,
	setDisplayNodes,
	setReactFlowInstance,
	showBackground,
	ref,
	minHeightPixels,
	minWidthPixels,
}: FlowProps) {
	return (
		<div ref={ref}>
			<ReactFlowProvider>
				<ReactFlow
					style={{
						minWidth: minWidthPixels,
						minHeight: minHeightPixels,
					}}
					edges={displayEdges}
					edgeTypes={edgeTypes}
					snapToGrid={true}
					fitView={true}
					nodeTypes={nodeTypes}
					nodes={displayNodes}
					onConnect={(params) => {
						setDisplayEdges((els: Edge[]) => addEdge(params, els));
					}}
					onEdgesChange={(edgeChanges) => {
						setDisplayEdges(
							applyEdgeChanges(edgeChanges, displayEdges),
						);
					}}
					onNodesChange={(nodeChanges) => {
						setDisplayNodes(
							applyNodeChanges(nodeChanges, displayNodes),
						);
					}}
					onEdgeUpdate={(oldEdge, newConnections) => {
						setDisplayEdges((els: Edge[]) =>
							updateEdge(oldEdge, newConnections, els),
						);
					}}
					onInit={setReactFlowInstance}
					proOptions={{ hideAttribution: true }}
					connectionMode={connectionMode}
				>
					<Controls className="bg-accent focus:bg-accent-content border-black" />
					{showBackground && (
						<Background
							variant={BackgroundVariant.Dots}
							color="yellow"
						/>
					)}
				</ReactFlow>
			</ReactFlowProvider>
		</div>
	);
}

export function InternalFlowHeader({ nodeType, formData }: ServiceNodeData) {
	const nodeContext = useContext(NodeContext);

	const { t } = useTranslation('assets');
	const { SVG } = TypeSVGMap[nodeType];

	return (
		<div
			className={`bg-base-100 border-b-2 border-base-200 w-full h-[${NAV_BAR_HEIGHT_PIXELS}px] flex-none`}
		>
			<div className="flex justify-between p-4 border-b-2 border-b-neutral gap-4">
				<div className="flex justify-between gap-4">
					<figure>
						<SVG className="w-12 h-12" />
					</figure>
					<div>
						<h2 className="text-base-content text-md">
							{t(TypeTagMap[nodeType])}
						</h2>
						{formData.nodeName && (
							<p className="text-base-content text-sm">
								{formData.nodeName}
							</p>
						)}
					</div>
				</div>
				<button>
					<ChevronLeftIcon
						className="h-12 w-12 text-base-content hover:text-primary"
						onClick={() => {
							nodeContext.handleNodeExpand(null);
						}}
					/>
				</button>
			</div>
		</div>
	);
}

export function FlowContainer({ isSidebarOpen }: { isSidebarOpen: boolean }) {
	const [windowHeight, windowWidth] = useWindowsDimensions();

	const [flowHeight, setFlowHeight] = useState(
		calculateFlowHeight(windowHeight, false),
	);

	const [configuredNode, setNodeToConfigure] = useState<Node<
		ServiceNodeData | InternalNodeData
	> | null>(null);
	const [expandedNode, setNodeToExpand] =
		useState<Node<ServiceNodeData> | null>(null);

	const [nodes, setNodes] = useState<Node<ServiceNodeData>[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);

	/*
	The displayNodes and displayEdges dictate which nodes and edges are displayed on the screen.
	They are separate from nodes and edges above because we have nested data.
	*/

	const [displayNodes, setDisplayNodes] = useState<Node[]>(nodes);
	const [displayEdges, setDisplayEdges] = useState<Edge[]>(edges);

	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance | null>(null);

	const [dndDropData, ref] = useBoundedDrop();

	// node expansion
	useEffect(() => {
		if (expandedNode) {
			const { childNodes, childEdges } = expandedNode.data;
			setDisplayNodes(childNodes);
			setDisplayEdges(childEdges);
		} else {
			setDisplayNodes(nodes);
			setDisplayEdges(edges);
		}
	}, [expandedNode]);

	// drag and drop
	useEffect(() => {
		if (dndDropData && reactFlowInstance) {
			const { nodeType, ...rest } = dndDropData;
			setDisplayNodes([
				...displayNodes,
				createNode({
					...rest,
					reactFlowInstance,
					data: { nodeType },
				}),
			]);
		}
	}, [dndDropData, nodes, reactFlowInstance]);

	const handleNodeConfig = useCallback(
		(nodeId: string | null) => {
			if (nodeId) {
				const node = nodes.find((n) => n.id === nodeId)!;
				setNodeToConfigure(node);
			} else {
				setNodeToConfigure(null);
			}
		},
		[nodes],
	);

	const handleNodeExpand = useCallback(
		(nodeId: string | null) => {
			if (nodeId) {
				const node = nodes.find((n) => n.id === nodeId)!;
				setNodeToExpand(node);
			} else {
				setNodeToExpand(null);
			}
		},
		[nodes],
	);

	useEffect(() => {
		setFlowHeight(calculateFlowHeight(windowHeight, !!expandedNode));
	}, [windowHeight, expandedNode]);

	useEffect(() => {
		if (expandedNode) {
			setNodes(
				nodes.map((n) => {
					if (n.id === expandedNode.id) {
						n.data.childNodes = displayNodes;
					}
					return n;
				}),
			);
		} else {
			setNodes(displayNodes);
		}
	}, [displayNodes]);

	useEffect(() => {
		if (expandedNode) {
			setNodes(
				nodes.map((n) => {
					if (n.id === expandedNode.id) {
						n.data.childEdges = displayEdges;
					}
					return n;
				}),
			);
		} else {
			setEdges(displayEdges);
		}
	}, [displayEdges]);

	return (
		<main className="grow h-full w-full">
			<NodeContext.Provider
				value={{
					handleNodeConfig,
					handleNodeExpand,
					expandedNode,
					childNodes: nodes.filter(
						(n) => n.parentNode,
					) as unknown as Node<InternalNodeData>[],
				}}
			>
				<div className="flex gap-0">
					<Drawer isOpen={isSidebarOpen}>
						<ul className={`p-2 mx-auto w-48`}>
							<MenuItem nodeType={ServiceNodeType.NestJs} />
							<MenuItem nodeType={ServiceNodeType.NextJs} />
						</ul>
					</Drawer>

					<div
						className={`h-full transition-all duration-300 ease-in-out grow ${
							expandedNode
								? 'bg-base-100 rounded border-2 border-neutral'
								: 'bg-base-300'
						}`}
					>
						{expandedNode && (
							<InternalFlowHeader {...expandedNode.data} />
						)}

						<Flow
							showBackground={!expandedNode}
							connectionMode={
								expandedNode
									? ConnectionMode.Strict
									: ConnectionMode.Loose
							}
							displayNodes={displayNodes}
							displayEdges={displayEdges}
							setDisplayEdges={setDisplayEdges}
							setDisplayNodes={setDisplayNodes}
							setReactFlowInstance={setReactFlowInstance}
							minHeightPixels={flowHeight}
							minWidthPixels={windowWidth}
							ref={ref}
						/>
					</div>
				</div>
				{configuredNode && (
					<div className="absolute inset-1 w-5/10 h-full z-10 flex justify-center">
						<NodeForm
							nodeType={configuredNode.data.nodeType}
							formData={configuredNode.data.formData}
							saveFormDataHandler={(formData) => {
								setDisplayNodes(
									nodes.map((node) => {
										if (node.id === configuredNode.id) {
											node.data.formData = formData;
										}
										return node;
									}),
								);
								setNodeToConfigure(null);
							}}
							closeMenuHandler={() => {
								setNodeToConfigure(null);
							}}
						/>
					</div>
				)}
			</NodeContext.Provider>
		</main>
	);
}
