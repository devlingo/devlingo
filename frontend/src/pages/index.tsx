import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['home'])),
		},
	};
}

export default function Home() {
	const { t } = useTranslation('home');

	return (
		<main>
			<div>
				<span>{t('placeholder')}</span>
			</div>
		</main>
	);
}
