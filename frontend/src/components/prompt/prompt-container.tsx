import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { assign } from 'radash';
import { useState } from 'react';
import { Edge, Node } from 'reactflow';

import { PromptModal } from '@/components/prompt/prompt-modal';
import { ONE_SECOND_IN_MILLISECONDS } from '@/constants';
import { requestPrompt } from '@/utils/api';
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
	const [isDialogueOpen, setIsDialogueOpen] = useState(false);

	return (
		<div className="shadow-lg max-w-xl bg-base-200 rounded-2xl">
			<div className="alert ">
				<button
					onClick={() => {
						setIsDialogueOpen(!isDialogueOpen);
					}}
				>
					{isDialogueOpen ? (
						<ChevronUpIcon className="w-5" />
					) : (
						<ChevronDownIcon className="w-5" />
					)}
					<span>{t('accept_changes_question')}</span>
				</button>
				<div className="flex-none">
					<button
						className="btn btn-sm btn-ghost"
						onClick={() => {
							void handleUserDecision(PromptState.Decline);
						}}
					>
						{t('decline')}
					</button>
					<button
						className="btn btn-sm btn-primary"
						onClick={() => {
							void handleUserDecision(PromptState.Accept);
						}}
					>
						{t('accept')}
					</button>
				</div>
			</div>
			{isDialogueOpen && (
				<div className="flex">
					<p className="indent-8 m-6">&quot;{promptAnswer}&quot;</p>
				</div>
			)}
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
				<div className="alert shadow-lg">
					<progress className="progress progress-secondary w-56" />
				</div>
			) : promptState === PromptState.Error ? (
				<div className="alert alert-error shadow-lg">
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
						<span>{t('prompt_error_message')}</span>
					</div>
				</div>
			) : promptState === PromptState.Accept ? (
				<div className="alert alert-success shadow-lg">
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
						<span>{t('design_accepted_message')}</span>
					</div>
				</div>
			) : (
				<div className="alert shadow-lg">
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
						<span>{t('design_declined_message')}</span>
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
	displayEdges: Edge[];
	displayNodes: Node[];
	closePromptModal: () => void;
	handleDisplayEdges: (edges: Edge[]) => void;
	handleDisplayNodes: (nodes: Node[]) => void;
	isPromptModalOpen: boolean;
}

export function PromptContainer({
	displayEdges,
	displayNodes,
	closePromptModal,
	handleDisplayEdges,
	handleDisplayNodes,
	isPromptModalOpen,
}: PromptContainerProps) {
	const [promptState, setPromptState] = useState(PromptState.Hidden);
	const [promptAnswer, setPromptAnswer] = useState<string | null>(null);

	const existingDesigns = {
		edges: [...displayEdges],
		nodes: [...displayNodes],
	};

	const handlePromptSubmit = async (promptContent: string) => {
		closePromptModal();
		setPromptState(PromptState.Loading);
		try {
			const { answer, design } = await requestPrompt({
				edges: displayEdges,
				nodes: displayNodes,
				promptContent,
				//FIXME: replace designId and projectId with real values
				designId: '31ca5283-e104-4759-99a5-092958c3ddec',
				projectId: 'aba8a2ea-1fb3-4575-b3a4-d42099822164',
			});

			handleDisplayNodes(
				design.nodes.map((node) => {
					const existingNode = displayNodes.find(
						(displayNode) => displayNode.id === node.id,
					);
					return existingNode ? assign(existingNode, node) : node;
				}),
			);
			handleDisplayEdges(design.edges);

			setPromptAnswer(answer);
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
			handleDisplayNodes(existingDesigns.nodes);
			handleDisplayEdges(existingDesigns.edges);
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
