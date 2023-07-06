import { fireEvent, render, screen } from 'tests/test-utils';

import { PromptState } from '@/components/design-canvas-page/prompt/constants';
import { PromptAnswerDialogue } from '@/components/design-canvas-page/prompt/prompt-answer-dialogue';

describe('PromptAnswerDialogue_function', () => {
	it('pressing accept sets the appropriate state', () => {
		const handleUserDecision = vi.fn();
		render(
			<PromptAnswerDialogue handleUserDecision={handleUserDecision} />,
		);
		const acceptButton = screen.getByTestId('prompt-accept-changes-button');
		fireEvent.click(acceptButton);
		expect(handleUserDecision).toHaveBeenCalledWith(PromptState.Accept);
	});

	it('pressing decline sets the appropriate state', () => {
		const handleUserDecision = vi.fn();
		render(
			<PromptAnswerDialogue handleUserDecision={handleUserDecision} />,
		);
		const declineButton = screen.getByTestId(
			'prompt-decline-changes-button',
		);
		fireEvent.click(declineButton);
		expect(handleUserDecision).toHaveBeenCalledWith(PromptState.Decline);
	});
});
