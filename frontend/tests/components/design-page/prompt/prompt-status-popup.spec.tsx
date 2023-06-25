import { render, screen } from 'tests/test-utils';

import { PromptState } from '@/components/design-canvas-page/prompt/constants';
import { PromptStatusPopup } from '@/components/design-canvas-page/prompt/prompt-status-popup';

describe('PromptStatusPopup tests', () => {
	it('test_loading_state', () => {
		render(<PromptStatusPopup promptState={PromptState.Loading} />);
		expect(screen.getByTestId('prompt-loading-alert')).toBeInTheDocument();
	});

	it('test_error_state', () => {
		render(<PromptStatusPopup promptState={PromptState.Error} />);
		expect(screen.getByTestId('prompt-error-alert')).toBeInTheDocument();
	});

	it('test_accept_state', () => {
		render(<PromptStatusPopup promptState={PromptState.Accept} />);
		expect(screen.getByTestId('prompt-accept-alert')).toBeInTheDocument();
	});

	it('test_decline_state', () => {
		render(<PromptStatusPopup promptState={PromptState.Decline} />);
		expect(screen.getByTestId('prompt-decline-alert')).toBeInTheDocument();
	});
});
