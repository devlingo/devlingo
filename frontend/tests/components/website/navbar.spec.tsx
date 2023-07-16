import { useRouter } from 'next/router';
import { fireEvent, render, screen } from 'tests/test-utils';

import { Navbar } from '@/components/website/navbar';
import { Navigation } from '@/constants';
import { useUser } from '@/stores/api-store';

vi.mock('next/router', () => ({
	useRouter: vi.fn(),
}));

vi.mock('@/stores/api-store', () => ({
	useUser: vi.fn(),
}));

describe('Navbar tests', () => {
	it('clicking on the logo when not on the home page should navigate to the home page', () => {
		const pushMock = vi.fn();
		// @ts-expect-error
		useRouter.mockImplementation(() => ({
			pathname: '/other',
			push: pushMock,
		}));

		render(<Navbar />);
		const logoButton = screen.getByText('DevLingo');
		fireEvent.click(logoButton);

		expect(pushMock).toHaveBeenCalledWith('/');
	});

	it('clicking on the CTA button when user is signed in should navigate to the projects page', () => {
		const pushMock = vi.fn();
		// @ts-expect-error
		useRouter.mockImplementation(() => ({ push: pushMock }));
		// @ts-expect-error
		useUser.mockImplementation(() => ({}));

		render(<Navbar />);
		const ctaButton = screen.getByRole('button', {
			name: /navbarCtaDesign/i,
		});
		fireEvent.click(ctaButton);

		expect(pushMock).toHaveBeenCalledWith(Navigation.Projects);
	});

	it('clicking on the CTA button when user is not signed in should navigate to the sign in page', () => {
		const pushMock = vi.fn();
		// @ts-expect-error
		useRouter.mockImplementation(() => ({ push: pushMock }));
		// @ts-expect-error
		useUser.mockImplementation(() => null);

		render(<Navbar />);
		const ctaButton = screen.getByRole('button', {
			name: /navbarCtaLogin/i,
		});
		fireEvent.click(ctaButton);

		expect(pushMock).toHaveBeenCalledWith(Navigation.SignIn);
	});

	it('Navbar behaviour when user is not signed in', () => {
		// @ts-expect-error
		useUser.mockImplementation(() => null);

		render(<Navbar />);
		const ctaButton = screen.getByRole('button', {
			name: /navbarCtaLogin/i,
		});

		expect(ctaButton).toBeInTheDocument();
	});
});
