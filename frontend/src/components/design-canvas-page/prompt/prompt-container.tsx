import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { requestPrompt } from '@/api/prompt-api';
import { PromptModal } from '@/components/design-canvas-page/prompt/prompt-modal';
import { ONE_SECOND_IN_MILLISECONDS } from '@/constants';
import {
	useDisplayEdges,
	useDisplayNodes,
	useSetEdges,
	useSetNodes,
} from '@/hooks/use-design-canvas-store';
import { NormalizeEdges } from '@/utils/edge';
import { wait } from '@/utils/time';

export function PromptAnswerDialogue({
	handleUserDecision,
	promptAnswer,
}: {
	handleUserDecision: (
		decision: PromptState.Accept | PromptState.Decline,
	) => Promise<void>;
	promptAnswer: string;
}) {
	const { t } = useTranslation('prompt');
	const [isDialogueOpen, setIsDialogueOpen] = useState(true);

	return (
		<div
			className="modal modal-open sm:modal-bottom"
			data-testid="prompt-response-dialogue"
		>
			<div className="modal-box bg-base-100">
				<h2 className="pb-2 pt-1">{t('acceptChangesQuestion')}</h2>
				<div className="join join-horizontal gap-4">
					<button
						data-testid="prompt-decline-changes-button"
						className="btn btn-sm btn-ghost"
						onClick={() => {
							void handleUserDecision(PromptState.Decline);
						}}
					>
						{t('decline')}
					</button>
					<button
						data-testid="prompt-accept-changes-button"
						className="btn btn-sm btn-primary"
						onClick={() => {
							void handleUserDecision(PromptState.Accept);
						}}
					>
						{t('accept')}
					</button>
				</div>
				<div className="pt-3">
					<button
						data-testid="prompt-toggle-answer-button"
						onClick={() => {
							setIsDialogueOpen(!isDialogueOpen);
						}}
					>
						{isDialogueOpen ? (
							<ChevronUpIcon className="w-5" />
						) : (
							<ChevronDownIcon className="w-5" />
						)}
					</button>
					{isDialogueOpen && <div>&quot;{promptAnswer}&quot;</div>}
				</div>
			</div>
		</div>
	);
}

export function PromptStatusPopup({
	promptState,
}: {
	promptState: PromptState;
}) {
	const { t } = useTranslation(['prompt', 'common']);

	return (
		<div className="z-30 fixed left-16">
			{promptState === PromptState.Loading ? (
				<div
					className="alert shadow-lg"
					data-testid="prompt-loading-alert"
				>
					<progress className="progress progress-secondary w-56" />
				</div>
			) : promptState === PromptState.Error ? (
				<div
					className="alert alert-error shadow-lg"
					data-testid="prompt-error-alert"
				>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{t('promptErrorMessage')}</span>
					</div>
				</div>
			) : promptState === PromptState.Accept ? (
				<div
					className="alert alert-success shadow-lg"
					data-testid="prompt-accept-alert"
				>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{t('designAcceptedMessage')}</span>
					</div>
				</div>
			) : (
				<div
					className="alert shadow-lg"
					data-testid="prompt-decline-alert"
				>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="stroke-info flex-shrink-0 w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<span>{t('designDeclinedMessage')}</span>
					</div>
				</div>
			)}
		</div>
	);
}

export enum PromptState {
	Accept = 'Accept',
	Decline = 'Decline',
	Error = 'Error',
	Hidden = 'Hidden',
	Loading = 'Loading',
}

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
