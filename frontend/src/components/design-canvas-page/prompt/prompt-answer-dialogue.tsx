import { useTranslation } from 'next-i18next';

import { PromptState } from '@/components/design-canvas-page/prompt/constants';

export function PromptAnswerDialogue({
	handleUserDecision,
}: {
	handleUserDecision: (
		decision: PromptState.Accept | PromptState.Decline,
	) => Promise<void>;
}) {
	const { t } = useTranslation('prompt');

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
			</div>
		</div>
	);
}
