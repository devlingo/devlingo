import { BackgroundVariant } from '@reactflow/background';
import { ConnectionMode, Edge, Node, ReactFlowInstance } from '@reactflow/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';

import { Drawer } from '@/components/drawer-menu/drawer';
import { MenuItem } from '@/components/drawer-menu/menu-item';
import { FlowContainer } from '@/components/flow/flow-container';
import { initialEdges, initialNodes } from '@/components/flow/initial-data';
import { NodeWithIconData } from '@/components/flow/nodes/node-with-icon';
import { Footer } from '@/components/footer';
import { DefaultNavbar, InternalNodeNavbar } from '@/components/navbar';
import { NodeType } from '@/constants';
import { DropTargetData, NodeData } from '@/types';
import { createNode } from '@/utils/node';

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				'home',
				'navbar',
				'assets',
			])),
		},
	};
}

function useBoundedDrop(): [
	DropTargetData | null,
	(element: HTMLDivElement) => void,
] {
	const ref = useRef<HTMLDivElement>();
	const [dropData, dropRef] = useDrop<any, any, DropTargetData | null>(
		() => ({
			accept: 'MenuItem',
			drop: (item: { type: NodeType }, monitor) => {
				const offset = monitor.getSourceClientOffset();

				if (offset && ref.current) {
					const { left, top } = ref.current.getBoundingClientRect();
					return {
						...item,
						...{
							x: offset.x - left,
							y: offset.y - top,
						},
					};
				}
				return null;
			},
			collect: (monitor) => monitor.getDropResult<DropTargetData>(),
		}),
	);

	return [
		dropData,
		(element: HTMLDivElement) => {
			ref.current = element;
			dropRef(element);
		},
	];
}

export default function Index() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [nodeData, setNodeData] = useState<NodeData | null>(null);
	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance | null>(null);

	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);

	const [dropData, ref] = useBoundedDrop();

	const expandNodeHandler = (nodeData: NodeData) => {
		setNodeData(nodeData);
	};

	useEffect(() => {
		if (nodeData) {
			setNodes(nodeData.initialNodes);
			setEdges(nodeData.initialEdges);
		} else {
			setNodes(
				initialNodes.map((node: Node<NodeWithIconData>) => {
					node.data.expandNodeHandler = (nodeData: NodeData) => {
						setNodeData(nodeData);
					};
					return node;
				}),
			);
			setEdges(initialEdges);
		}
	}, [nodeData]);

	useEffect(() => {
		if (dropData && reactFlowInstance) {
			setNodes([
				...nodes,
				createNode({
					...dropData,
					data: { expandNodeHandler },
					reactFlowInstance,
				}),
			]);
		}
	}, [dropData, nodes, reactFlowInstance]);

	const handleBurgerIconClick = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	const handleSaveIconClick = () => {
		console.log('save icon clicked');
	};
	const handleShareIconClick = () => {
		console.log('share icon clicked');
	};
	const handleUserIconClick = () => {
		console.log('user icon clicked');
	};
	const handleDownloadIconClick = () => {
		console.log('download icon clicked');
	};

	return (
		<>
			<div className="bg-base-300 mx-auto h-full w-full">
				{nodeData ? (
					<InternalNodeNavbar
						name={nodeData.name}
						type={nodeData.type}
						onBurgerIconClick={handleBurgerIconClick}
						collapseCanvasHandler={() => {
							setNodeData(null);
						}}
						NodeIcon={nodeData.NodeIcon}
					/>
				) : (
					<DefaultNavbar
						projectName="Backend Example"
						onBurgerIconClick={handleBurgerIconClick}
						onSaveIconClick={handleSaveIconClick}
						onUserIconClick={handleUserIconClick}
						onDownloadIconClick={handleDownloadIconClick}
						onShareIconClick={handleShareIconClick}
					/>
				)}
				<main className="h-full w-full">
					<div className="flex gap-0">
						<Drawer isOpen={isSidebarOpen}>
							<ul>
								<MenuItem type={NodeType.NestJs} />
								<MenuItem type={NodeType.NextJs} />
							</ul>
						</Drawer>
						<div
							ref={ref}
							className={`h-full transition-all duration-300 ease-in-out w-full min-w-[67%]`}
						>
							<FlowContainer
								backgroundVariant={
									nodeData
										? BackgroundVariant.Cross
										: BackgroundVariant.Dots
								}
								connectionMode={
									nodeData
										? ConnectionMode.Strict
										: ConnectionMode.Loose
								}
								edges={edges}
								nodes={nodes}
								setEdges={setEdges}
								setNodes={setNodes}
								setReactFlowInstance={setReactFlowInstance}
								color={nodeData ? 'green' : 'yellow'}
							/>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
}
