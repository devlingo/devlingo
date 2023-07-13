import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LegalDoc } from '@/components/website/legal-doc';

export async function getServerSideProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['termsOfService'])),
		},
	};
}

export default function TermsOfService() {
	const { t, i18n } = useTranslation('termsOfService');
	const keys = Object.keys(
		i18n.services.resourceStore.data[i18n.language].termsOfService,
	);
	const sections: { title: string; content: string }[] = keys.reduce(
		(sections: { title: string; content: string }[], key, i) => {
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
		<div className="bg-base-100">
			<div className="bg-base-100 px-20">
				<LegalDoc
					title={t('termsOfServiceHeading')}
					lastUpdated={t('lastUpdatedDate')}
					sections={sections}
				/>
			</div>
		</div>
	);
}
