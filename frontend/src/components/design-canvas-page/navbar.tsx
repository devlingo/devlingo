import {
	Bars3Icon,
	DocumentArrowDownIcon,
	PhotoIcon,
	ShareIcon,
} from '@heroicons/react/24/solid';
import { useContext, useState } from 'react';

import { ThemeContext } from '@/context';
import { daisyUIThemes } from '@/wrapper';

export interface NavbarProps {
	projectName: string;
}

export function Navbar({ projectName }: NavbarProps) {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const themeContext = useContext(ThemeContext);

	return (
		<header
			className="navbar bg-base-100 border-base-200 border-b-2"
			data-testid="navbar"
		>
			<div className="navbar-start pl-2">
				<select
					className="select select-bordered select-xs w-5/10 max-w-xs text-base-content"
					onChange={(event) =>
						themeContext.setTheme(event.target.value)
					}
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
			<div className="navbar-end pr-2">
				<details
					className={`dropdown ${
						isDropDownOpen && 'dropdown-open'
					} dropdown-left`}
				>
					<summary
						className="btn btn-square btn-ghost opacity-60 hover:opacity-100 ml-2"
						data-testid="navbar-options-button"
						onClick={() => {
							setIsDropDownOpen(!isDropDownOpen);
						}}
					>
						<Bars3Icon className="h-7 w-7 text-base-content" />
					</summary>
					<ul
						tabIndex={0}
						className="dropdown-content menu shadow bg-neutral rounded-box border-2 border-base-300 w-32 p-2 z-10"
					>
						<li>
							<button className="btn btn-xs btn-ghost w-fit mb-2">
								<ShareIcon className="h-4 w-4" />
								<span className="text-xs">Share</span>
							</button>
						</li>
						<li>
							<button className="btn btn-xs btn-ghost w-fit mb-2">
								<PhotoIcon className="h-4 w-4" />
								<span className="text-xs">Save as</span>
							</button>
						</li>
						<li>
							<button className="btn btn-xs btn-ghost w-fit mb-2">
								<DocumentArrowDownIcon className="h-4 w-4" />
								<span className="text-xs">Export</span>
							</button>
						</li>
					</ul>
				</details>
			</div>
		</header>
	);
}
