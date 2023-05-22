import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { FlowContainer } from '@/components/flow/flow-container';
import { Navbar } from '@/components/navbar';

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['assets'])),
		},
	};
}

export default function Index() {
	const handleBurgerIconClick = () => {
		return;
	};
	const handleSaveIconClick = () => {
		return;
	};
	const handleShareIconClick = () => {
		return;
	};
	const handleUserIconClick = () => {
		return;
	};
	const handleDownloadIconClick = () => {
		return;
	};

	return (
		<div className="mx-auto">
			<Navbar
				onBurgerIconClick={handleBurgerIconClick}
				onDownloadIconClick={handleDownloadIconClick}
				onSaveIconClick={handleSaveIconClick}
				onShareIconClick={handleShareIconClick}
				onUserIconClick={handleUserIconClick}
				projectName="Backend Example"
			/>
			<FlowContainer />
		</div>
	);
}
