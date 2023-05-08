import {
	ArrowDownTrayIcon,
	Bars4Icon,
	PhotoIcon,
	UserCircleIcon,
	UserPlusIcon,
} from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';

export interface NavbarProps {
	projectName?: string;
}

export function Navbar({ projectName = 'Unnamed Project' }: NavbarProps) {
	const { t } = useTranslation('navbar');

	return (
		<header className="navbar drop-shadow bg-base-white text-base-100 flex-none">
			<NavbarButton icon={<Bars4Icon className="h-7 w-7" />} />
			<div className="flex-1 ml-2">
				<a className="btn btn-ghost normal-case text-lg">
					{projectName}
				</a>
			</div>
			<NavbarButton icon={<UserPlusIcon className="h-7 w-7" />} />
			<NavbarButton icon={<ArrowDownTrayIcon className="h-7 w-7" />} />
			<NavbarButton icon={<PhotoIcon className="h-7 w-7" />} />
			<NavbarButton icon={<UserCircleIcon className="h-7 w-7" />} />
			<button className="btn btn-outline btn-primary mr-2 ml-2 w-60">
				{t('generateCode')}
			</button>
		</header>
	);
}

function NavbarButton({ icon }: { icon: React.ReactChild }) {
	return (
		<div className="flex-none mr-2 ml-2">
			<button className="btn btn-square btn-ghost">{icon}</button>
		</div>
	);
}
