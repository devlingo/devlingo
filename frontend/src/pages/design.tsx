import { ReactFlowInstance, ReactFlowProvider } from '@reactflow/core';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { ConnectionMode } from 'reactflow';

import { retrieveVersionById } from '@/api';
import { Flow } from '@/components/design-canvas-page/flow/flow';
import { InternalFlowHeader } from '@/components/design-canvas-page/flow/internal-flow-header';
import { NodeForm } from '@/components/design-canvas-page/forms/node-form';
import { Navbar } from '@/components/design-canvas-page/navbar';
import { PromptContainer } from '@/components/design-canvas-page/prompt/prompt-container';
import { SideRail } from '@/components/design-canvas-page/side-menu/side-rail';
import { Navigation } from '@/constants';
import {
	useCurrentDesign,
	useCurrentVersion,
	useSetCurrentVersion,
} from '@/hooks/use-api-store';
import { useBoundedDrop } from '@/hooks/use-bounded-drop';
import {
	useConfiguredNode,
	useExpandedNode,
	useInsertNode,
	useSetConfiguredNode,
} from '@/hooks/use-design-canvas-store';
import { useIsClientSide } from '@/hooks/use-is-client-side';
import { createNode } from '@/utils/node';
import { sortByDateProp } from '@/utils/time';

export async function getServerSideProps({ locale }: { locale: string }) {
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

export default function DesignCanvasPage() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const configuredNode = useConfiguredNode();
	const expandedNode = useExpandedNode();
	const insertNode = useInsertNode();
	const isClientSide = useIsClientSide();
	const setConfiguredNode = useSetConfiguredNode();

	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
	const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance | null>(null);

	// design
	const currentDesign = useCurrentDesign();

	const currentVersion = useCurrentVersion();
	const setCurrentVersion = useSetCurrentVersion();

	useEffect(() => {
		if (!currentDesign) {
			void router.push(Navigation.Base);
			return;
		}
		if (currentDesign.versions.length && !currentVersion) {
			(async () => {
				try {
					setIsLoading(true);
					const { id: versionId } = sortByDateProp(
						currentDesign.versions,
					)('createdAt', 'desc')[0];
					const version = await retrieveVersionById({
						versionId,
					});
					setCurrentVersion(version);
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
			</main>
		</ReactFlowProvider>
	);
}