import { fireEvent, render, screen } from 'tests/test-utils';

import { Navbar } from '@/components/design-canvas-page/navbar';
import { ThemeContext } from '@/context';

describe('Navbar tests', () => {
	it('renders correctly', () => {
		render(<Navbar designName="Test Design" />);
		const navbar = screen.getByTestId('navbar');
		const projectName = screen.getByTestId('navbar-design-name');
		const themeSelect = screen.getByTestId('navbar-theme-select');
		expect(navbar).toBeInTheDocument();
		expect(projectName).toHaveTextContent('Test Design');
		expect(themeSelect).toBeInTheDocument();
	});

	it('changes them on select', () => {
		const setTheme = vi.fn();
		render(<Navbar designName="Test Design" />, {
			wrapper: ({ children }) => (
				<ThemeContext.Provider
					value={{
						currentTheme: 'light',
						setTheme,
						backgroundColor: '#fff',
					}}
				>
					{children}
				</ThemeContext.Provider>
			),
		});
		const themeSelect = screen.getByTestId('navbar-theme-select');
		fireEvent.change(themeSelect, { target: { value: 'dark' } });
		expect(setTheme).toHaveBeenCalledWith('dark');
	});

	it('handles an empty design name', () => {
		render(<Navbar designName="" />);
		const projectName = screen.getByTestId('navbar-design-name');
		expect(projectName).toHaveTextContent('');
	});

	it('default theme to dracula', () => {
		render(<Navbar designName="Test Design" />);
		const themeSelect = screen.getByTestId('navbar-theme-select');
		expect(themeSelect).toHaveValue('dracula');
	});
});
