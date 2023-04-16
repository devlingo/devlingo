import { render, screen } from 'tests/utils';

import Home from '@/pages';

describe('Home page tests', () => {
	it('renders a greeting message to Tom', () => {
		render(<Home />);
		expect(screen.getByText('Hello Tom')).toBeInTheDocument();
	});
});
