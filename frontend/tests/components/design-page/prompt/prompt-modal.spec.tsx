import { fireEvent } from '@testing-library/react';
import { render, screen, waitFor } from 'tests/test-utils';

import { PromptModal } from '@/components/design-canvas-page/prompt/prompt-modal';

describe('PromptModal tests', () => {
	it('doesnt allow submit without input', () => {
		render(
			<PromptModal
				handlePromptSubmit={vi.fn()}
				handleModalClose={vi.fn()}
			/>,
		);
		const submitButton = screen.getByTestId('prompt-modal-submit-button');
		expect(submitButton).toBeDisabled();
	});

	it('doesnt allow submit for inputs with less than the minimum length', () => {
		render(
			<PromptModal
				handlePromptSubmit={vi.fn()}
				handleModalClose={vi.fn()}
			/>,
		);
		const submitButton = screen.getByTestId('prompt-modal-submit-button');
		const textarea = screen.getByTestId('prompt-modal-textarea');
		fireEvent.change(textarea, { target: { value: 'test' } });
		expect(submitButton).toBeDisabled();
	});

	it('closes the modal on pressing cancel', () => {
		const handleModalClose = vi.fn();
		render(
			<PromptModal
				handlePromptSubmit={vi.fn()}
				handleModalClose={handleModalClose}
			/>,
		);
		const cancelButton = screen.getByTestId('prompt-modal-cancel-button');
		fireEvent.click(cancelButton);
		expect(handleModalClose).toHaveBeenCalled();
	});

	it('submits a prompt', async () => {
		const handlePromptSubmit = vi.fn();
		render(
			<PromptModal
				handlePromptSubmit={handlePromptSubmit}
				handleModalClose={vi.fn()}
			/>,
		);
		const textarea = screen.getByTestId('prompt-modal-textarea');
		fireEvent.change(textarea, { target: { value: 'test prompt' } });
		const submitButton = screen.getByTestId('prompt-modal-submit-button');
		fireEvent.click(submitButton);
		await waitFor(() => {
			expect(handlePromptSubmit).toHaveBeenCalledWith('test prompt');
		});
	});
});
