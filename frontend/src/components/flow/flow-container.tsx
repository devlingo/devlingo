import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import {
	addEdge,
	Connection,
	OnEdgesChange,
	OnNodesChange,
	ReactFlowInstance,
	updateEdge,
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
} from 'reactflow';

import { TypeSVGMap } from '@/assets';
import { Drawer } from '@/components/drawer-menu/drawer';
import { MenuItem } from '@/components/drawer-menu/menu-item';
import { HttpRestEdge } from '@/components/flow/edges/http-rest-edge';
import { initialEdges, initialNodes } from '@/components/flow/initial-data';
import { InternalNode, ServiceNode } from '@/components/flow/nodes';
import { NodeForm } from '@/components/forms/node-form';
import {
	DEFAULT_FLOW_HEIGHT,
	FOOTER_HEIGHT_PIXELS,
	NAV_BAR_HEIGHT_PIXELS,
	REM,
	ServiceNodeType,
	TypeTagMap,
} from '@/constants';
import { InternalNodeData, ServiceNodeData } from '@/types';
import { NodeContext, ThemeContext } from '@/utils/context';
import { useBoundedDrop, useWindowsDimensions } from '@/utils/hooks';
import { createNode } from '@/utils/node';

const calculateFlowHeight = (
	windowHeight: number,
	isExpandedNode: boolean,
): number => {
	let flowHeight =
		windowHeight - (NAV_BAR_HEIGHT_PIXELS + FOOTER_HEIGHT_PIXELS / 2);

	if (isExpandedNode) {
		flowHeight -= NAV_BAR_HEIGHT_PIXELS - (FOOTER_HEIGHT_PIXELS - REM / 2);
	}

	return flowHeight > 0 ? flowHeight : DEFAULT_FLOW_HEIGHT;
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
	dndRef: (element: HTMLDivElement) => void;
	handleEdgeConnect: (connection: Connection) => void;
	handleEdgeUpdate: (edge: Edge, connection: Connection) => void;
	handleEdgesDelete: (edges: Edge[]) => void;
	containerHeight: number;
	containerWidth: number;
	setDisplayEdges: (edges: Edge[] | ((values: any) => Edge[])) => void;
	setDisplayNodes: (nodes: Node[] | ((values: any) => Node[])) => void;
	setReactFlowInstance: (reactFlowInstance: ReactFlowInstance) => void;
	showBackground: boolean;
}

function Flow({
	connectionMode,
	displayEdges,
	displayNodes,
	dndRef,
	handleEdgeConnect,
	handleEdgeUpdate,
	handleEdgesDelete,
	containerHeight,
	containerWidth,
	setDisplayEdges,
	setDisplayNodes,
	setReactFlowInstance,
	showBackground,
}: FlowProps) {
	const theme = useContext(ThemeContext);

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

	const onEdgesChangeHandler: OnEdgesChange = (edgeChanges) => {
		setDisplayEdges(applyEdgeChanges(edgeChanges, displayEdges));
	};
	const onNodesChangeHandler: OnNodesChange = (nodeChanges) => {
		setDisplayNodes(applyNodeChanges(nodeChanges, displayNodes));
	};
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
					connectionMode={connectionMode}
					edgeTypes={edgeTypes}
					edges={displayEdges}
					fitView={true}
					nodeTypes={nodeTypes}
					nodes={displayNodes}
					onConnect={handleEdgeConnect}
					onEdgeUpdate={handleEdgeUpdate}
					onEdgesChange={onEdgesChangeHandler}
					onEdgesDelete={handleEdgesDelete}
					onInit={setReactFlowInstance}
					onNodesChange={onNodesChangeHandler}
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

	const [dndDropData, dndRef] = useBoundedDrop();

	// flow container sizing
	useEffect(() => {
		setFlowHeight(calculateFlowHeight(windowHeight, !!expandedNode));
	}, [windowHeight, expandedNode]);

	// node expansion
	useEffect(() => {
		if (expandedNode) {
			const { childNodes, childEdges } = expandedNode.data;
			setDisplayNodes(childNodes ?? []);
			setDisplayEdges(childEdges ?? []);
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
			const { nodeType, x, y } = dndDropData;
			setDisplayNodes([
				...displayNodes,
				createNode({
					position: reactFlowInstance.project({ x, y }),
					data: { nodeType, formData: { nodeName: 'Unnamed' } },
				}),
			]);
		}
	}, [dndDropData, nodes, reactFlowInstance]);

	const handleNodeConfig = useCallback(
		(nodeId: string | null, parentNodeId?: string | null) => {
			if (nodeId) {
				if (parentNodeId) {
					const parentNode = nodes.find(
						(n) => n.id === parentNodeId,
					)!;
					const node = parentNode.data.childNodes!.find(
						(n) => n.id === nodeId,
					)!;
					setNodeToConfigure(node);
				} else {
					const node = nodes.find((n) => n.id === nodeId)!;
					setNodeToConfigure(node);
				}
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

	const handleEdgeConnect = (connection: Connection) => {
		setDisplayEdges((els: Edge[]) => addEdge(connection, els));
	};

	const handleEdgeUpdate = (edge: Edge, connection: Connection) => {
		setDisplayEdges((els: Edge[]) => updateEdge(edge, connection, els));
	};

	const handleEdgesDelete = (edges: Edge[]) => {
		console.log(edges);
	};

	return (
		<main className="grow h-full w-full">
			<NodeContext.Provider
				value={{
					handleNodeConfig,
					handleNodeExpand,
					expandedNode,
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
						{flowHeight && windowWidth && (
							<Flow
								connectionMode={ConnectionMode.Loose}
								displayEdges={displayEdges}
								displayNodes={displayNodes}
								dndRef={dndRef}
								handleEdgeConnect={handleEdgeConnect}
								handleEdgeUpdate={handleEdgeUpdate}
								handleEdgesDelete={handleEdgesDelete}
								containerHeight={flowHeight}
								containerWidth={windowWidth}
								setDisplayEdges={setDisplayEdges}
								setDisplayNodes={setDisplayNodes}
								setReactFlowInstance={setReactFlowInstance}
								showBackground={!expandedNode}
							/>
						)}
					</div>
				</div>
				{configuredNode && (
					<div className="absolute inset-1 w-5/10 h-full z-10 flex justify-center">
						<NodeForm
							nodeType={configuredNode.data.nodeType}
							formData={configuredNode.data.formData}
							parentNodeType={
								Reflect.get(
									configuredNode.data,
									'parentNodeType',
								) as ServiceNodeType | undefined
							}
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
