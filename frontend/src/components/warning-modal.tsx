import { HandRaisedIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';

export function WarningModal({
	warningText,
	closeModal,
	onContinue,
}: {
	warningText: string;
	closeModal: () => void;
	onContinue: () => void;
}) {
	const { t } = useTranslation('common');

	return (
		<div className="modal modal-open modal-middle sm:modal-middle">
			<div className="modal-box bg-warning">
				<div className="flex gap-4">
					<HandRaisedIcon className="text-warning-content h-6 w-4" />
					<span
						className="text-warning-content"
						data-testid="warning-modal-text"
					>
						{warningText}
					</span>
				</div>
				<div className="modal-action">
					<button
						data-testid="warning-modal-cancel-button"
						className="btn btn-xs btn-outline"
						onClick={closeModal}
					>
						<span className="text-warning-content">
							{t('cancel')}
						</span>
					</button>
					<button
						data-testid="warning-modal-continue-button"
						className="btn btn-accent btn-xs"
						onClick={onContinue}
					>
						<span className="text-accent-content">
							{t('continue')}
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
