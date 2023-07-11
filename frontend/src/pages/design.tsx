import { ReactFlowInstance, ReactFlowProvider } from '@reactflow/core';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { ConnectionMode } from 'reactflow';
import { createNode } from 'shared/utils/node';

import { retrieveVersionById } from '@/api';
import { ContextMenu } from '@/components/design-canvas-page/context-menu/context-menu';
import { FlowContainer } from '@/components/design-canvas-page/flow/flow-container';
import { NodeForm } from '@/components/design-canvas-page/forms/node-form';
import { Navbar } from '@/components/design-canvas-page/navbar';
import { PromptContainer } from '@/components/design-canvas-page/prompt/prompt-container';
import { SideRail } from '@/components/design-canvas-page/side-menu/side-rail';
import { Navigation } from '@/constants';
import { useBoundedDrop } from '@/hooks/use-bounded-drop';
import { useIsClientSide } from '@/hooks/use-is-client-side';
import { useCurrentDesign } from '@/stores/api-store';
import {
	useConfiguredNode,
	useNodes,
	useSetConfiguredNode,
	useSetEdges,
	useSetNodes,
	useSetViewPort,
} from '@/stores/design-store';
import { sortByDateProp } from '@/utils/time';

export async function getServerSideProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				'assets',
				'prompt',
				'common',
				'contextMenu',
			])),
		},
	};
}

export default function DesignCanvasPage() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const configuredNode = useConfiguredNode();
	const isClientSide = useIsClientSide();
	const setConfiguredNode = useSetConfiguredNode();

	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
	const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance | null>(null);

	// design
	const currentDesign = useCurrentDesign();
	const nodes = useNodes();
	const setNodes = useSetNodes();
	const setEdges = useSetEdges();
	const setViewPort = useSetViewPort();

	useEffect(() => {
		if (!currentDesign) {
			void router.push(Navigation.Base);
			return;
		}
		if (currentDesign.versions.length) {
			(async () => {
				try {
					setIsLoading(true);
					const { id: versionId } = sortByDateProp(
						currentDesign.versions,
					)('createdAt', 'desc')[0];
					const {
						data: { nodes, edges, viewport },
					} = await retrieveVersionById({
						designId: currentDesign.id,
						projectId: currentDesign.projectId,
						versionId,
					});
					setNodes(nodes);
					setEdges(edges);
					setViewPort(viewport);
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, []);

	// drag and drop
	const [dndDropData, dndRef] = useBoundedDrop();
	useEffect(() => {
		if (dndDropData && reactFlowInstance) {
			const { nodeType, x, y } = dndDropData;

			setNodes([
				...nodes,
				createNode({
					position: reactFlowInstance.project({ x, y }),
					data: {
						nodeType,
						formData: { nodeName: 'Unnamed' },
					},
				}),
			]);
		}
	}, [dndDropData, reactFlowInstance]);

	return (
		<ReactFlowProvider>
			<Navbar designName={currentDesign?.name ?? 'Untitled Design'} />
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
				{isLoading ? (
					<div className="h-full w-full flex justify-center items-center">
						<div className="loading loading-lg" />
					</div>
				) : (
					<div
						className={`h-full transition-all duration-300 ease-in-out bg-base-300 ${
							isSideMenuOpen ? 'shrink' : 'grow'
						}`}
					>
						{isClientSide && (
							<FlowContainer
								currentDesign={currentDesign!}
								connectionMode={ConnectionMode.Loose}
								dndRef={dndRef}
								isFullWidth={!isSideMenuOpen}
								setReactFlowInstance={setReactFlowInstance}
							/>
						)}
					</div>
				)}
				{configuredNode && (
					<div className="absolute inset-1 w-5/10 z-10 flex justify-center">
						<NodeForm
							closeMenuHandler={() => {
								setConfiguredNode(null);
							}}
						/>
					</div>
				)}
				<ContextMenu />
			</main>
		</ReactFlowProvider>
	);
}
