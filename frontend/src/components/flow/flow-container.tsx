import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import {
	OnConnect,
	OnEdgesChange,
	OnEdgeUpdateFunc,
	OnNodesChange,
	ReactFlowInstance,
} from '@reactflow/core';
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
	minHeightPixels: number;
	minWidthPixels: number;
	ref: (element: HTMLDivElement) => void;
	setDisplayEdges: (edges: Edge[] | ((values: any) => Edge[])) => void;
	setDisplayNodes: (nodes: Node[] | ((values: any) => Node[])) => void;
	setReactFlowInstance: (reactFlowInstance: ReactFlowInstance) => void;
	showBackground: boolean;
}

function Flow({
	connectionMode,
	displayEdges,
	displayNodes,
	minHeightPixels,
	minWidthPixels,
	ref,
	setDisplayEdges,
	setDisplayNodes,
	setReactFlowInstance,
	showBackground,
}: FlowProps) {
	const onConnectHandler: OnConnect = (params) => {
		setDisplayEdges((els: Edge[]) => addEdge(params, els));
	};
	const onEdgesChangeHandler: OnEdgesChange = (edgeChanges) => {
		setDisplayEdges(applyEdgeChanges(edgeChanges, displayEdges));
	};
	const onNodesChangeHandler: OnNodesChange = (nodeChanges) => {
		setDisplayNodes(applyNodeChanges(nodeChanges, displayNodes));
	};
	const onEdgeUpdateHandler: OnEdgeUpdateFunc = (oldEdge, newConnections) => {
		setDisplayEdges((els: Edge[]) =>
			updateEdge(oldEdge, newConnections, els),
		);
	};
	return (
		<div ref={ref}>
			<ReactFlowProvider>
				<ReactFlow
					connectionMode={connectionMode}
					edgeTypes={edgeTypes}
					edges={displayEdges}
					fitView={true}
					nodeTypes={nodeTypes}
					nodes={displayNodes}
					onConnect={onConnectHandler}
					onEdgeUpdate={onEdgeUpdateHandler}
					onEdgesChange={onEdgesChangeHandler}
					onInit={setReactFlowInstance}
					onNodesChange={onNodesChangeHandler}
					proOptions={{ hideAttribution: true }}
					snapToGrid={true}
					style={{
						// NOTE: we are forced to pass style here because reactflow has issues with setting the container heights
						// using classes. These values are calculated in the parent to be responsive to window size changes.
						minWidth: minWidthPixels,
						minHeight: minHeightPixels,
					}}
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

	// flow container sizing
	useEffect(() => {
		setFlowHeight(calculateFlowHeight(windowHeight, !!expandedNode));
	}, [windowHeight, expandedNode]);

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
