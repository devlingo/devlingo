import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { Position } from '@reactflow/core';
import { useTranslation } from 'next-i18next';
import { assign } from 'radash';
import { useState } from 'react';
import { Edge, Node } from 'reactflow';

import { PromptModal } from '@/components/prompt/prompt-modal';
import { ONE_SECOND_IN_MILLISECONDS } from '@/constants';
import { requestPrompt } from '@/utils/api';
import { positionHandle } from '@/utils/edge';
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
		<div className="modal modal-open sm:modal-bottom">
			<div className="modal-box bg-base-100">
				<h2 className="pb-2 pt-1">{t('accept_changes_question')}</h2>
				<div className="join join-horizontal gap-4">
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
				<div className="pt-3">
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
	closePromptModal: () => void;
	displayEdges: Edge[];
	displayNodes: Node[];
	isPromptModalOpen: boolean;
	setDisplayNodes: (nodes: Node[]) => void;
	setDisplayEdges: (edges: Edge[]) => void;
}

export function PromptContainer({
	closePromptModal,
	displayEdges,
	displayNodes,
	isPromptModalOpen,
	setDisplayEdges,
	setDisplayNodes,
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
				designId: '31ca5283-e104-4759-99a6-092958c3ddec',
				projectId: 'aba8a2ea-1fb3-4575-b3a4-d42099822165',
			});

			const updatedNodes = design.nodes.map((node) => {
				const existingNode = displayNodes.find(
					(displayNode) => displayNode.id === node.id,
				);
				return existingNode ? assign(existingNode, node) : node;
			});

			const updatedEdges = design.edges.map((edge) => {
				edge.sourceHandle = positionHandle(
					edge.source,
					edge.sourceHandle ?? Position.Right,
				);
				edge.targetHandle = positionHandle(
					edge.target,
					edge.targetHandle ?? Position.Right,
				);
				return edge;
			});

			setDisplayNodes(updatedNodes);
			setDisplayEdges(updatedEdges);
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
			setDisplayNodes(existingDesigns.nodes);
			setDisplayEdges(existingDesigns.edges);
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
