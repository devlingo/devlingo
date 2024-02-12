import { useMemo, useState } from 'react';
import { TimeUnit } from 'shared/constants';

import { requestPrompt } from '@/api/prompt-api';
import { PromptState } from '@/components/design-canvas-page/prompt/constants';
import { PromptAnswerDialogue } from '@/components/design-canvas-page/prompt/prompt-answer-dialogue';
import { PromptModal } from '@/components/design-canvas-page/prompt/prompt-modal';
import { PromptStatusPopup } from '@/components/design-canvas-page/prompt/prompt-status-popup';
import { useCurrentDesign } from '@/stores/api-store';
import {
	useDisplayEdges,
	useDisplayNodes,
	useSetEdges,
	useSetNodes,
} from '@/stores/design-store';
import { NormalizeEdges } from '@/utils/edge';
import { wait } from '@/utils/time';

export interface PromptContainerProps {
	closePromptModal: () => void;
	isPromptModalOpen: boolean;
}

export function PromptContainer({
	closePromptModal,
	isPromptModalOpen,
}: PromptContainerProps) {
	const currentDesign = useCurrentDesign()!;

	const setNodes = useSetNodes();
	const setEdges = useSetEdges();
	const displayNodes = useDisplayNodes();
	const displayEdges = useDisplayEdges();

	const [promptState, setPromptState] = useState(PromptState.Hidden);

	const existingDesigns = useMemo(
		() => ({
			edges: [...displayEdges],
			nodes: [...displayNodes],
		}),
		[displayEdges, displayNodes],
	);

	const handlePromptSubmit = async (useInput: string) => {
		closePromptModal();
		setPromptState(PromptState.Loading);
		try {
			const { nodes, edges } = await requestPrompt({
				designId: currentDesign.id,
				projectId: currentDesign.projectId,
				useInput,
			});
			setNodes(nodes);
			setEdges(NormalizeEdges(edges, nodes));
			setPromptState(PromptState.Arrived);
			await wait(TimeUnit.OneSecondInMilliseconds);
		} catch {
			setPromptState(PromptState.Error);
			await wait(TimeUnit.OneSecondInMilliseconds * 2);
			setPromptState(PromptState.Hidden);
		}
	};

	const handleUserDecision = async (
		decision: PromptState.Accept | PromptState.Decline,
	) => {
		setPromptState(decision);

		if (decision === PromptState.Decline) {
			setNodes(existingDesigns.nodes);
			setEdges(existingDesigns.edges);
		}

		await wait(TimeUnit.OneSecondInMilliseconds * 2);
		setPromptState(PromptState.Hidden);
	};

	if (promptState === PromptState.Hidden) {
		return (
			<>
				{isPromptModalOpen && (
					<PromptModal
						handleModalClose={closePromptModal}
						handlePromptSubmit={handlePromptSubmit}
					/>
				)}
			</>
		);
	}

	return (
		<>
			{promptState === PromptState.Arrived ? (
				<PromptAnswerDialogue handleUserDecision={handleUserDecision} />
			) : (
				<PromptStatusPopup promptState={promptState} />
			)}
		</>
	);
}
