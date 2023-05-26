import { render, screen } from '@testing-library/react';

import { Footer } from '@/components/footer';

describe('Footer tests', () => {
	it('renders placeholder text', () => {
		render(<Footer />);
		expect(screen.getByTestId('footer')).toBeInTheDocument();
	});
});
