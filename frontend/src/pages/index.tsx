import { ReactFlowInstance, ReactFlowProvider } from '@reactflow/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { ConnectionMode } from 'reactflow';

import { Flow } from '@/components/flow/flow-canvas';
import { InternalFlowHeader } from '@/components/flow/internal-flow-header';
import { NodeForm } from '@/components/forms/node-form';
import { Navbar } from '@/components/navbar';
import { PromptContainer } from '@/components/prompt/prompt-container';
import { SideRail } from '@/components/side-menu/side-rail';
import { useBoundedDrop } from '@/hooks/use-bounded-drop';
import {
	useConfiguredNode,
	useExpandedNode,
	useInsertNode,
	useUnsetConfiguredNode,
} from '@/hooks/use-store';
import { createNode } from '@/utils/node';

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				'assets',
				'prompt',
				'common',
			])),
		},
	};
}

export default function Index() {
	const handleBurgerIconClick = () => {
		return;
	};
	const handleSaveIconClick = () => {
		return;
	};
	const handleShareIconClick = () => {
		return;
	};
	const handleUserIconClick = () => {
		return;
	};
	const handleDownloadIconClick = () => {
		return;
	};

	const insertNode = useInsertNode();
	const configuredNode = useConfiguredNode();
	const expandedNode = useExpandedNode();
	const unsetConfiguredNode = useUnsetConfiguredNode();

	const [isClientSide, setIsClientSide] = useState(false);
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
	const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance | null>(null);

	const [dndDropData, dndRef] = useBoundedDrop();

	useEffect(() => {
		// useEffect is executed only on the client side.
		// we need to render the react-flow components only in SPA mode.
		setIsClientSide(true);
	}, []);

	// drag and drop
	useEffect(() => {
		if (dndDropData && reactFlowInstance) {
			const { nodeType, x, y } = dndDropData;

			insertNode(
				createNode({
					position: reactFlowInstance.project({ x, y }),
					data: {
						nodeType,
						formData: { nodeName: 'Unnamed' },
					},
				}),
			);
		}
	}, [dndDropData, reactFlowInstance]);

	return (
		<ReactFlowProvider>
			<Navbar
				onBurgerIconClick={handleBurgerIconClick}
				onDownloadIconClick={handleDownloadIconClick}
				onSaveIconClick={handleSaveIconClick}
				onShareIconClick={handleShareIconClick}
				onUserIconClick={handleUserIconClick}
				projectName="Backend Example"
			/>
			<main className="h-full w-full flex justify-between">
				<PromptContainer
					closePromptModal={() => {
						setIsPromptModalOpen(false);
					}}
					isPromptModalOpen={isPromptModalOpen}
				/>
				<SideRail
					isMenuOpen={isSideMenuOpen}
					setIsMenuOpen={setIsSideMenuOpen}
					togglePromptModal={() => {
						setIsPromptModalOpen(!isPromptModalOpen);
					}}
				/>
				<div
					className={`h-full transition-all duration-300 ease-in-out ${
						expandedNode
							? 'bg-base-100 rounded border-2 border-neutral'
							: 'bg-base-300'
					} ${isSideMenuOpen ? 'shrink' : 'grow'}`}
				>
					{expandedNode && (
						<InternalFlowHeader {...expandedNode.data} />
					)}
					{isClientSide && (
						<Flow
							connectionMode={ConnectionMode.Loose}
							dndRef={dndRef}
							isExpandedNode={!!expandedNode}
							isFullWidth={!isSideMenuOpen}
							setReactFlowInstance={setReactFlowInstance}
							showBackground={!expandedNode}
						/>
					)}
				</div>
				{configuredNode && (
					<div className="absolute inset-1 w-5/10 h-full z-10 flex justify-center">
						<NodeForm
							closeMenuHandler={() => {
								unsetConfiguredNode();
							}}
						/>
					</div>
				)}
			</main>
		</ReactFlowProvider>
	);
}
