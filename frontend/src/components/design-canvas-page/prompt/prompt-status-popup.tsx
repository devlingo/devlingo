import { useTranslation } from 'next-i18next';

import { PromptState } from '@/components/design-canvas-page/prompt/constants';

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
