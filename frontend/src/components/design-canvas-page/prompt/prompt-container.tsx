import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { requestPrompt } from '@/api/prompt-api';
import { PromptState } from '@/components/design-canvas-page/prompt/constants';
import { PromptAnswerDialogue } from '@/components/design-canvas-page/prompt/prompt-answer-dialogue';
import { PromptModal } from '@/components/design-canvas-page/prompt/prompt-modal';
import { PromptStatusPopup } from '@/components/design-canvas-page/prompt/prompt-status-popup';
import { ONE_SECOND_IN_MILLISECONDS } from '@/constants';
import {
	useDisplayEdges,
	useDisplayNodes,
	useSetEdges,
	useSetNodes,
} from '@/hooks/use-design-canvas-store';
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
	const setNodes = useSetNodes();
	const setEdges = useSetEdges();
	const displayNodes = useDisplayNodes();
	const displayEdges = useDisplayEdges();

	const [promptState, setPromptState] = useState(PromptState.Hidden);
	const [promptAnswer, setPromptAnswer] = useState<string | null>(null);

	const existingDesigns = useMemo(
		() => ({
			edges: [...displayEdges],
			nodes: [...displayNodes],
		}),
		[displayEdges, displayNodes],
	);

	const handlePromptSubmit = async (promptContent: string) => {
		closePromptModal();
		setPromptState(PromptState.Loading);
		try {
			const { answer, nodes, edges } = await requestPrompt({
				edges: displayEdges,
				nodes: displayNodes,
				promptContent,
				//FIXME: replace designId and projectId with real values
				designId: uuidv4(),
				projectId: uuidv4(),
			});

			setNodes(nodes);
			setEdges(NormalizeEdges(edges, nodes));
			setPromptAnswer(answer);
			await wait(ONE_SECOND_IN_MILLISECONDS);
		} catch {
			setPromptState(PromptState.Error);
			await wait(ONE_SECOND_IN_MILLISECONDS * 2);
			setPromptState(PromptState.Hidden);
		}
	};

	const handleUserDecision = async (
		decision: PromptState.Accept | PromptState.Decline,
	) => {
		setPromptAnswer(null);
		setPromptState(decision);

		if (decision === PromptState.Decline) {
			setNodes(existingDesigns.nodes);
			setEdges(existingDesigns.edges);
		}

		await wait(ONE_SECOND_IN_MILLISECONDS * 2);
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
			{promptAnswer ? (
				<PromptAnswerDialogue
					promptAnswer={promptAnswer}
					handleUserDecision={handleUserDecision}
				/>
			) : (
				<PromptStatusPopup promptState={promptState} />
			)}
		</>
	);
}
