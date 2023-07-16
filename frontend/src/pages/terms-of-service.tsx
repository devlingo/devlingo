import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Footer } from '@/components/website/footer';
import { LegalDoc } from '@/components/website/legal-doc';
import { Navbar } from '@/components/website/navbar';
import { LegalSection } from '@/types';

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				'termsOfService',
				'website',
			])),
		},
	};
}

export default function TermsOfService() {
	const { t, i18n } = useTranslation(['termsOfService']);
	const keys = Object.keys(
		i18n.services.resourceStore.data[i18n.language].termsOfService,
	);
	const sections: LegalSection[] = keys.reduce(
		(sections: LegalSection[], key, i) => {
			if (key.endsWith('Title') && keys[i + 1]?.endsWith('Content')) {
				sections.push({
					title: t(key),
					content: t(keys[i + 1]),
				});
			}
			return sections;
		},
		[],
	);

	return (
		<div className="bg-base-200">
			<Navbar />
			<LegalDoc
				title={t('termsOfServiceHeading')}
				lastUpdated={t('lastUpdatedDate')}
				sections={sections}
			/>
			<Footer />
		</div>
	);
}
