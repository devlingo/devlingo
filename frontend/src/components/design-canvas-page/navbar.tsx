import { UserIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';

import { ThemeContext } from '@/context';
import { handleChange } from '@/utils/helpers';
import { daisyUIThemes } from '@/wrapper';

export interface NavbarProps {
	projectName: string;
}

export function Navbar({ projectName }: NavbarProps) {
	const themeContext = useContext(ThemeContext);

	return (
		<header
			className="navbar bg-base-100 border-base-200 border-b-2"
			data-testid="navbar"
		>
			<div className="navbar-start pl-2">
				<select
					className="select select-bordered select-xs w-5/10 max-w-xs text-base-content"
					onChange={handleChange(themeContext.setTheme)}
					defaultValue={themeContext.currentTheme}
					data-testid="navbar-theme-select"
				>
					{daisyUIThemes.map((theme, i) => (
						<option value={theme} key={i}>
							{theme}
						</option>
					))}
				</select>
			</div>
			<div className="navbar-center">
				<span
					className="text-base-content normal-case font-bold"
					data-testid="navbar-project-name"
				>
					{projectName}
				</span>
			</div>
			<div className="navbar-end">
				<button
					className="btn btn-ghost btn-sm rounded-full"
					data-testid="navbar-user-profile-button"
				>
					<UserIcon className="h-6 w-6" />
				</button>
			</div>
		</header>
	);
}
