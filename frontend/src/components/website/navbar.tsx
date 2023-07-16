import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { LogoTransparent } from '@/assets';
import { Navigation } from '@/constants';
import { useUser } from '@/stores/api-store';

export function Navbar() {
	const { t } = useTranslation(['website']);
	const router = useRouter();
	const isUserSignedIn = !!useUser();

	const handleCtaClick = () => {
		if (isUserSignedIn) {
			void router.push(Navigation.Projects);
		} else {
			void router.push(Navigation.SignIn);
		}
	};
	const logoClick = () => {
		if (router.pathname === '/') {
			window.scrollTo({
				top: document.documentElement.offsetTop,
				behavior: 'smooth',
			});
		} else {
			void router.push(Navigation.Base);
		}
	};

	return (
		<div className="navbar sticky top-0 z-10  backdrop-filter backdrop-blur">
			<div className="navbar-start mx-2 ">
				<button
					className="btn btn-ghost normal-case font-poppins text-xl text-base-content"
					onClick={logoClick}
				>
					<LogoTransparent className="w-8 h-8 text-primary" />
					{t('DevLingo')}
				</button>
			</div>
			<div className="navbar-center"></div>
			<div className="navbar-end mx-2">
				<button
					className="btn btn-outline btn-primary mt-3 p-4"
					onClick={handleCtaClick}
				>
					{isUserSignedIn
						? t('navbarCtaDesign')
						: t('navbarCtaLogin')}
				</button>
			</div>
		</div>
	);
}
