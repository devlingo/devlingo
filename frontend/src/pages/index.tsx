import 'firebaseui/dist/firebaseui.css';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import { getUserProfile } from '@/api';
import { Navigation } from '@/constants';
import { useSetUser } from '@/stores/api-store';
import { firebaseUIConfig, getFirebaseAuth } from '@/utils/firebase';

export async function getServerSideProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['signIn'])),
		},
	};
}
export default function Index() {
	const { t } = useTranslation('signIn');
	const [uiRendered, setIsUIRendered] = useState(false);
	const [isSignedIn, setIsSignedIn] = useState(false);

	const router = useRouter();
	const setUser = useSetUser();

	/* firebaseui cannot be imported in SSR mode, so we have to import it only when the browser loads. */
	useEffect(() => {
		(async () => {
			const firebaseUI = await import('firebaseui');
			const auth = await getFirebaseAuth();
			const ui =
				firebaseUI.auth.AuthUI.getInstance() ??
				new firebaseUI.auth.AuthUI(auth);

			// noinspection JSUnusedGlobalSymbols
			ui.start('#firebaseui-auth-container', {
				...firebaseUIConfig,
				...{
					callbacks: {
						uiShown: () => {
							setIsUIRendered(true);
						},
						signInSuccessWithAuthResult: () => {
							// prevent the UI from redirecting the user using a preconfigured redirect-url
							setIsSignedIn(true);
							return false;
						},
					},
				},
			});
		})();
	}, []);

	useEffect(() => {
		if (isSignedIn) {
			(async () => {
				const user = await getUserProfile();
				setUser(user);
				void router.push(Navigation.Projects);
			})();
		}
	}, [isSignedIn]);

	useEffect(() => {
		if (uiRendered) {
			const footer = document.querySelector('.firebaseui-card-footer');
			const tosMessage = document.querySelector('.firebaseui-tos');

			if (footer) {
				footer.classList.add('mb-16');
			}
			if (tosMessage) {
				tosMessage.classList.add('text-base-content');
			}
		}
	}, [uiRendered]);

	return (
		<main className="h-screen w-screen bg-base-200 flex items-center">
			<div className="mx-auto p-16 bg-base-100 border-1  rounded-box shadow transition-all duration-700 ease-in-out">
				<div id="firebaseui-auth-container">
					<div className={`m-10 ${uiRendered ? '' : 'hidden'}`}>
						<h1 className="text-2xl md:text-4xl  2xl:text-5xl font-bold text-center text-base-content mb-2">
							{t('authHeader')}
						</h1>
						<p className="text-center text-base-content">
							<span>{t('authSubtitle')} </span>
							<span className="hidden md:inline">
								{t('authSubtitleLarger')}
							</span>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
