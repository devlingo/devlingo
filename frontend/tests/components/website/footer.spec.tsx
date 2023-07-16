import { render, screen } from '@testing-library/react';

import { Footer } from '@/components/website/footer';
import { Navigation } from '@/constants';

describe('Footer Component', () => {
	test('renders Footer without crashing', () => {
		render(<Footer />);
		expect(screen.getByRole('contentinfo')).toBeInTheDocument();
	});

	test('has correct navigation links', () => {
		render(<Footer />);
		const links = screen.getAllByRole('link');
		expect(links[0]).toHaveAttribute('href', Navigation.Base);
		expect(links[1]).toHaveAttribute('href', Navigation.About);
		expect(links[2]).toHaveAttribute('href', Navigation.Contact);
		expect(links[3]).toHaveAttribute('href', Navigation.Blog);
		expect(links[4]).toHaveAttribute('href', Navigation.TOS);
		expect(links[5]).toHaveAttribute('href', Navigation.PrivacyPolicy);
		expect(links[6]).toHaveAttribute('href', Navigation.Twitter);
		expect(links[7]).toHaveAttribute('href', Navigation.Linkedin);
		expect(links[8]).toHaveAttribute('href', Navigation.Discord);
	});
});
