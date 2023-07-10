import 'firebaseui/dist/firebaseui.css';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SignInScreen } from '@/components/sign-in-page/sign-in-screen';

export async function getServerSideProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['sign-in'])),
		},
	};
}
export default function Index() {
	return <SignInScreen />;
}
