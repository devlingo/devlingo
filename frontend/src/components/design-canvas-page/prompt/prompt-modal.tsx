import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { handleChange } from '@/utils/helpers';

export const MINIMUM_CHARACTERS_IN_PROMPT = 10;

export function PromptModal({
	handlePromptSubmit,
	handleModalClose,
}: {
	handlePromptSubmit: (prompt: string) => Promise<void>;
	handleModalClose: () => void;
}) {
	const { t } = useTranslation('prompt');
	const [prompt, setPrompt] = useState('');

	return (
		<div
			className="modal modal-open modal-bottom sm:modal-middle"
			data-testid="prompt-modal"
		>
			<div className="modal-box bg-base-100">
				<h3 className="font-bold text-lg">{t('promptModalTitle')}</h3>
				<p className="pb-6 pt-1 opacity-80">
					{t('promptModalSubtitle')}
				</p>
				<div className="opacity-80">
					<p className="text-sm">{t('promptModalExamples')}</p>
					<ul className="mx-8 mt-2 mb-6 list-disc text-sm">
						<li>{t('promptModalExample1')}</li>
						<li>{t('promptModalExample2')}</li>
						<li>{t('promptModalExample3')}</li>
					</ul>
				</div>
				<div className="form-control">
					<textarea
						placeholder={t('promptModalPlaceholder')!}
						className="textarea textarea-bordered textarea-md w-full"
						value={prompt}
						onChange={handleChange(setPrompt)}
						data-testid="prompt-modal-textarea"
					/>
					<div className="modal-action">
						<button
							className="btn btn-ghost opacity-80"
							data-testid="prompt-modal-cancel-button"
							onClick={handleModalClose}
						>
							{t('cancel')}
						</button>
						<button
							className="btn btn-primary"
							data-testid="prompt-modal-submit-button"
							onClick={() => {
								void handlePromptSubmit(prompt);
							}}
							disabled={
								!prompt ||
								prompt.length < MINIMUM_CHARACTERS_IN_PROMPT
							}
						>
							{t('submit')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
