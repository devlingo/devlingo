import {
	ArrowDownTrayIcon,
	Bars4Icon,
	PhotoIcon,
	ShareIcon,
	UserCircleIcon,
} from '@heroicons/react/24/solid';
import { MouseEvent, useContext } from 'react';

import { NAV_BAR_HEIGHT_PIXELS } from '@/constants';
import { ThemeContext } from '@/utils/context';
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
			className={`bg-base-100 border-b-2 border-base-200 h-[${NAV_BAR_HEIGHT_PIXELS}px] m-h-fit flex items-center flex-none`}
		>
			<div className="flex-none mr-2 ml-2">
				<button
					className="btn btn-square btn-ghost"
					onClick={onBurgerIconClick}
				>
					<Bars4Icon className="h-7 w-7" />
				</button>
			</div>
			<div className="flex-1 ml-2">
				<a className="btn btn-ghost normal-case text-lg text-base-content">
					{projectName}
				</a>
			</div>
			<select
				className="select select-bordered select-xs w-5/10 max-w-xs"
				onChange={(event) => themeContext.setTheme(event.target.value)}
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
			/>
			<NavbarButton
				Icon={ArrowDownTrayIcon}
				onClickHandler={onSaveIconClick}
			/>
			<NavbarButton
				Icon={PhotoIcon}
				onClickHandler={onDownloadIconClick}
			/>
			<NavbarButton Icon={ShareIcon} onClickHandler={onShareIconClick} />
		</header>
	);
}

function NavbarButton({
	Icon,
	onClickHandler,
}: {
	Icon: React.ComponentType<any>;
	onClickHandler: (event: MouseEvent) => void;
}) {
	return (
		<div className="flex-none mr-2 ml-2">
			<button
				className="btn btn-square btn-ghost"
				onClick={onClickHandler}
			>
				<Icon className="h-7 w-7 text-base-content" />
			</button>
		</div>
	);
}
