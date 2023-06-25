import { fireEvent, render, screen } from 'tests/test-utils';

import { PromptState } from '@/components/design-canvas-page/prompt/constants';
import { PromptAnswerDialogue } from '@/components/design-canvas-page/prompt/prompt-answer-dialogue';

describe('PromptAnswerDialogue_function', () => {
	it('pressing accept sets the appropriate state', () => {
		const handleUserDecision = vi.fn();
		const promptAnswer = 'Test prompt answer';
		render(
			<PromptAnswerDialogue
				handleUserDecision={handleUserDecision}
				promptAnswer={promptAnswer}
			/>,
		);
		const acceptButton = screen.getByTestId('prompt-accept-changes-button');
		fireEvent.click(acceptButton);
		expect(handleUserDecision).toHaveBeenCalledWith(PromptState.Accept);
	});

	it('pressing decline sets the appropriate state', () => {
		const handleUserDecision = vi.fn();
		const promptAnswer = 'Test prompt answer';
		render(
			<PromptAnswerDialogue
				handleUserDecision={handleUserDecision}
				promptAnswer={promptAnswer}
			/>,
		);
		const declineButton = screen.getByTestId(
			'prompt-decline-changes-button',
		);
		fireEvent.click(declineButton);
		expect(handleUserDecision).toHaveBeenCalledWith(PromptState.Decline);
	});

	it('shows prompt answer by default', () => {
		const handleUserDecision = vi.fn();
		const promptAnswer = 'Test prompt answer';
		render(
			<PromptAnswerDialogue
				handleUserDecision={handleUserDecision}
				promptAnswer={promptAnswer}
			/>,
		);
		expect(screen.getByTestId('prompt-answer-text')).toBeInTheDocument();
	});

	it('hides prompt answer when toggling', () => {
		const handleUserDecision = vi.fn();
		const promptAnswer = 'Test prompt answer';
		render(
			<PromptAnswerDialogue
				handleUserDecision={handleUserDecision}
				promptAnswer={promptAnswer}
			/>,
		);
		const toggleButton = screen.getByTestId('prompt-toggle-answer-button');
		fireEvent.click(toggleButton);
		expect(
			screen.queryByTestId('prompt-answer-text'),
		).not.toBeInTheDocument();
	});
});
