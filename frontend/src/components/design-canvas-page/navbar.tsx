import { Bars3Icon } from '@heroicons/react/24/solid';
import { MouseEvent, useContext } from 'react';

import { ThemeContext } from '@/context';
import { daisyUIThemes } from '@/wrapper';

export interface NavbarProps {
	onBurgerIconClick: () => void;
	onDownloadIconClick: (event: MouseEvent) => void;
	onSaveIconClick: (event: MouseEvent) => void;
	onShareIconClick: (event: MouseEvent) => void;
	onUserIconClick: (event: MouseEvent) => void;
	projectName: string;
}

export function Navbar({ projectName }: NavbarProps) {
	const themeContext = useContext(ThemeContext);

	return (
		<header
			className="navbar bg-base-100 border-base-200 border-b-2"
			data-testid="navbar"
		>
			<div className="navbar-start pl-1">
				<button
					className="btn btn-square btn-ghost opacity-60 hover:opacity-100"
					data-testid="navbar-options-button"
				>
					<Bars3Icon className="h-7 w-7 text-base-content " />
				</button>
			</div>
			<div className="navbar-center">
				<span
					className="text-base-content normal-case font-bold"
					data-testid="navbar-project-name"
				>
					{projectName}
				</span>
			</div>

			<div className="navbar-end pr-6">
				<select
					className="select select-bordered select-xs w-5/10 max-w-xs text-base-content"
					onChange={(event) =>
						themeContext.setTheme(event.target.value)
					}
					data-testid="navbar-theme-select"
					defaultValue={themeContext.currentTheme}
				>
					{daisyUIThemes.map((theme, i) => (
						<option value={theme} key={i}>
							{theme}
						</option>
					))}
				</select>
			</div>
		</header>
	);
}
