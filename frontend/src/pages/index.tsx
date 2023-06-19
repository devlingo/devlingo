import 'firebaseui/dist/firebaseui.css';

import {
	beforeAuthStateChanged,
	EmailAuthProvider,
	GithubAuthProvider,
	GoogleAuthProvider,
	User,
} from '@firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useSetToken, useToken } from '@/hooks/use-user-store';
import { getFirebaseAuth } from '@/utils/firebase';

const firebaseUIConfig = {
	signInFlow: 'popup',
	popupMode: true,
	siteName: 'Devlingo',
	signInOptions: [
		GithubAuthProvider.PROVIDER_ID,
		GoogleAuthProvider.PROVIDER_ID,
		{
			provider: 'microsoft.com',
			providerName: 'Microsoft',
			buttonColor: 'blue',
			iconUrl:
				'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
			customParameters: {
				prompt: 'consent',
				login_hint: 'user@firstadd.onmicrosoft.com',
				tenant: process.env.NEXT_PUBLIC_FIREBASE_MICROSOFT_TENANT_ID,
			},
		},
		EmailAuthProvider.PROVIDER_ID,
	],
};

function SignInScreen() {
	const [uiRendered, setIsUIRendered] = useState(false);
	const auth = getFirebaseAuth();
	const router = useRouter();
	const setToken = useSetToken();
	const token = useToken();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const unsubscribe = beforeAuthStateChanged(
			auth,
			async (user: User | null) => {
				if (user) {
					await setToken(auth);
				}
			},
		);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
		return () => unsubscribe();
	}, []);

	/* firebaseui cannot be imported in SSR mode, so we have to import it only when the browser loads. */
	useEffect(() => {
		(async () => {
			const firebaseUI = await import('firebaseui');
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
							void router.push('/design');
							// prevent the UI from redirecting the user using a preconfigured
							// redirect-url
							return false;
						},
					},
				},
			});
		})();
	}, []);

	return (
		<div
			className="mx-auto p-4 bg-base-100 border-2 border-base-200 rounded-box w-fit"
			id="firebaseui-auth-container"
		>
			{(!uiRendered || token) && <div className="loading loading-ring" />}
		</div>
	);
}

export default function Index() {
	return (
		<main className="h-screen w-screen bg-base-300 flex items-center">
			<SignInScreen />
		</main>
	);
}
