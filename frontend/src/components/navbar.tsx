import {
	ArrowDownTrayIcon,
	Bars4Icon,
	ChevronLeftIcon,
	PhotoIcon,
	ShareIcon,
	UserCircleIcon,
} from '@heroicons/react/24/solid';
import { MouseEvent, useContext } from 'react';

import { IconProps } from '@/assets';
import { ThemeContext } from '@/utils/context';

const daisyUIThemes = [
	'light',
	'dark',
	'cupcake',
	'bumblebee',
	'emerald',
	'corporate',
	'synthwave',
	'retro',
	'cyberpunk',
	'valentine',
	'halloween',
	'garden',
	'forest',
	'aqua',
	'lofi',
	'pastel',
	'fantasy',
	'wireframe',
	'black',
	'luxury',
	'dracula',
	'cmyk',
	'autumn',
	'business',
	'acid',
	'lemonade',
	'night',
	'coffee',
	'winter',
];

export interface NavbarProps {
	onBurgerIconClick: (event: MouseEvent) => void;
}

export interface DefaultNavbarProps extends NavbarProps {
	projectName: string;

	onUserIconClick: (event: MouseEvent) => void;
	onSaveIconClick: (event: MouseEvent) => void;
	onDownloadIconClick: (event: MouseEvent) => void;
	onShareIconClick: (event: MouseEvent) => void;
}

export interface InternalNodeNavbar extends NavbarProps {
	name: string;
	type: string;
	collapseCanvasHandler: () => void;
	NodeIcon: React.ComponentType<IconProps>;
}

export function DefaultNavbar({
	projectName,
	onBurgerIconClick,
	onUserIconClick,
	onSaveIconClick,
	onDownloadIconClick,
	onShareIconClick,
}: DefaultNavbarProps) {
	const themeContext = useContext(ThemeContext);
	return (
		<header className="navbar bg-base-100 border-b-2 border-base-200">
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

export function InternalNodeNavbar({
	NodeIcon,
	name,
	type,
	onBurgerIconClick,
	collapseCanvasHandler,
}: InternalNodeNavbar) {
	return (
		<header className="navbar bg-base-100 border-b-2 border-base-200 justify-between">
			<div className="flex-none mr-2 ml-2">
				<button
					className="btn btn-square btn-ghost"
					onClick={onBurgerIconClick}
				>
					<Bars4Icon className="h-7 w-7" />
				</button>
			</div>
			<div className="ml-2 flex gap-4 justify-around">
				<NodeIcon width={32} height={32} alt={'X'} />
				<span>{type}</span>
				<span>{name}</span>
			</div>
			<NavbarButton
				Icon={ChevronLeftIcon}
				onClickHandler={collapseCanvasHandler}
			/>
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
