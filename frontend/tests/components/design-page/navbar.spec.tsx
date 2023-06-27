import { fireEvent, render, screen } from 'tests/test-utils';

import { Navbar } from '@/components/design-canvas-page/navbar';
import { ThemeContext } from '@/context';

describe('Navbar tests', () => {
	it('renders correctly', () => {
		render(<Navbar designName="Test Project" />);
		const navbar = screen.getByTestId('navbar');
		const projectName = screen.getByTestId('navbar-design-name');
		const themeSelect = screen.getByTestId('navbar-theme-select');
		expect(navbar).toBeInTheDocument();
		expect(projectName).toHaveTextContent('Test Project');
		expect(themeSelect).toBeInTheDocument();
	});

	it('changes them on select', () => {
		const setTheme = vi.fn();
		render(<Navbar designName="Test Project" />, {
			wrapper: ({ children }) => (
				<ThemeContext.Provider
					value={{ currentTheme: 'light', setTheme }}
				>
					{children}
				</ThemeContext.Provider>
			),
		});
		const themeSelect = screen.getByTestId('navbar-theme-select');
		fireEvent.change(themeSelect, { target: { value: 'dark' } });
		expect(setTheme).toHaveBeenCalledWith('dark');
	});

	it('handles an empty project name', () => {
		render(<Navbar designName="" />);
		const projectName = screen.getByTestId('navbar-design-name');
		expect(projectName).toHaveTextContent('');
	});

	it('default theme to dracula', () => {
		render(<Navbar designName="Test Project" />);
		const themeSelect = screen.getByTestId('navbar-theme-select');
		expect(themeSelect).toHaveValue('dracula');
	});
});
