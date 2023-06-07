import {
	ArrowDownTrayIcon,
	Bars4Icon,
	PhotoIcon,
	ShareIcon,
	UserCircleIcon,
} from '@heroicons/react/24/solid';
import { MouseEvent, useContext } from 'react';

import { NAV_BAR_HEIGHT_PIXELS } from '@/constants';
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

export function Navbar({
	onBurgerIconClick,
	onDownloadIconClick,
	onSaveIconClick,
	onShareIconClick,
	onUserIconClick,
	projectName,
}: NavbarProps) {
	const themeContext = useContext(ThemeContext);

	return (
		<header
			// border-b-2 border-base-200
			className={`bg-base-100 h-[${NAV_BAR_HEIGHT_PIXELS}px] m-h-fit flex items-center flex-none border-b-2 border-base-200`}
			data-testid="navbar"
		>
			<div className="flex-none mr-2 ml-3">
				<button
					className="btn btn-square btn-ghost opacity-60 hover:opacity-100 text-base-content"
					onClick={onBurgerIconClick}
					data-testid="navbar-burger-button"
				>
					<Bars4Icon className="h-7 w-7" />
				</button>
				{/*<p className="test-xs leading-tight font-serif ">Devlingo</p>*/}
			</div>
			<div className="flex-1 ml-2">
				<a
					className="btn btn-ghost normal-case text-lg text-base-content"
					data-testid="navbar-project-name"
				>
					{projectName}
				</a>
			</div>
			<select
				className="select select-bordered select-xs w-5/10 max-w-xs opacity-60 hover:opacity-100 text-base-content"
				onChange={(event) => themeContext.setTheme(event.target.value)}
				data-testid="navbar-theme-select"
			>
				{daisyUIThemes.map((theme, i) => (
					<option value={theme} key={i}>
						{theme}
					</option>
				))}
			</select>
			<NavbarButton
				Icon={UserCircleIcon}
				onClickHandler={onUserIconClick}
				name="user"
			/>
			<NavbarButton
				Icon={ArrowDownTrayIcon}
				onClickHandler={onSaveIconClick}
				name="save"
			/>
			<NavbarButton
				Icon={PhotoIcon}
				onClickHandler={onDownloadIconClick}
				name="download"
			/>
			<NavbarButton
				Icon={ShareIcon}
				onClickHandler={onShareIconClick}
				name="share"
			/>
		</header>
	);
}

function NavbarButton({
	Icon,
	onClickHandler,
	name,
}: {
	Icon: React.ComponentType<any>;
	onClickHandler: (event: MouseEvent) => void;
	name: string;
}) {
	return (
		<div className="flex-none mr-2 ml-2">
			<button
				className="btn btn-square btn-ghost opacity-60 hover:opacity-100"
				onClick={onClickHandler}
				data-testid={`navbar-${name}-button`}
			>
				<Icon className="h-7 w-7 text-base-content" />
			</button>
		</div>
	);
}
