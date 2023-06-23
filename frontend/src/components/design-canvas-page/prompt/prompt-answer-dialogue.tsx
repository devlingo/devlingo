import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { PromptState } from '@/components/design-canvas-page/prompt/constants';

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
					{isDialogueOpen && (
						<div data-testid="prompt-answer-text">
							&quot;{promptAnswer}&quot;
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
