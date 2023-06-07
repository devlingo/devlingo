import { fireEvent } from '@testing-library/react';
import { render, screen } from 'tests/test-utils';

import { Navbar } from '@/components/navbar';
import { ThemeContext } from '@/context';

describe('Navbar tests', () => {
	it('renders as expected', () => {
		const props = {
			onBurgerIconClick: vi.fn(),
			onDownloadIconClick: vi.fn(),
			onSaveIconClick: vi.fn(),
			onShareIconClick: vi.fn(),
			onUserIconClick: vi.fn(),
			projectName: 'Test Project',
		};
		render(<Navbar {...props} />);
		expect(screen.getByTestId('navbar')).toBeInTheDocument();
		expect(screen.getByTestId('navbar-burger-button')).toBeInTheDocument();
		expect(screen.getByTestId('navbar-project-name')).toHaveTextContent(
			'Test Project',
		);
		expect(screen.getByTestId('navbar-theme-select')).toBeInTheDocument();
		expect(screen.getByTestId('navbar-user-button')).toBeInTheDocument();
		expect(screen.getByTestId('navbar-save-button')).toBeInTheDocument();
		expect(
			screen.getByTestId('navbar-download-button'),
		).toBeInTheDocument();
		expect(screen.getByTestId('navbar-share-button')).toBeInTheDocument();
	});

	it('changes theme using select value changes', () => {
		const setTheme = vi.fn();
		const themeContext = {
			currentTheme: 'light',
			setTheme: setTheme,
		};
		render(
			<ThemeContext.Provider value={themeContext}>
				<Navbar
					onBurgerIconClick={vi.fn()}
					onDownloadIconClick={vi.fn()}
					onSaveIconClick={vi.fn()}
					onShareIconClick={vi.fn()}
					onUserIconClick={vi.fn()}
					projectName="Test Project"
				/>
			</ThemeContext.Provider>,
		);
		const select = screen.getByTestId('navbar-theme-select');
		fireEvent.change(select, { target: { value: 'dark' } });
		expect(setTheme).toHaveBeenCalledWith('dark');
	});

	it('populates the project name', () => {
		render(
			<Navbar
				onBurgerIconClick={vi.fn()}
				onDownloadIconClick={vi.fn()}
				onSaveIconClick={vi.fn()}
				onShareIconClick={vi.fn()}
				onUserIconClick={vi.fn()}
				projectName="test"
			/>,
		);
		expect(screen.getByTestId('navbar-project-name')).toHaveTextContent(
			'test',
		);
	});

	it('triggers event handlers correctly', () => {
		const props = {
			onBurgerIconClick: vi.fn(),
			onDownloadIconClick: vi.fn(),
			onSaveIconClick: vi.fn(),
			onShareIconClick: vi.fn(),
			onUserIconClick: vi.fn(),
			projectName: 'Test Project',
		};
		render(<Navbar {...props} />);
		fireEvent.click(screen.getByTestId('navbar-burger-button'));
		fireEvent.click(screen.getByTestId('navbar-user-button'));
		fireEvent.click(screen.getByTestId('navbar-save-button'));
		fireEvent.click(screen.getByTestId('navbar-download-button'));
		fireEvent.click(screen.getByTestId('navbar-share-button'));
		expect(props.onBurgerIconClick).toHaveBeenCalled();
		expect(props.onUserIconClick).toHaveBeenCalled();
		expect(props.onSaveIconClick).toHaveBeenCalled();
		expect(props.onDownloadIconClick).toHaveBeenCalled();
		expect(props.onShareIconClick).toHaveBeenCalled();
	});
});
