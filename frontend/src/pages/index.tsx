import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

import { FlowContainer } from '@/components/flow/flow-container';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				'home',
				'navbar',
				'assets',
			])),
		},
	};
}

export default function Index() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleBurgerIconClick = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	const handleSaveIconClick = () => {
		console.log('save icon clicked');
	};
	const handleShareIconClick = () => {
		console.log('share icon clicked');
	};
	const handleUserIconClick = () => {
		console.log('user icon clicked');
	};
	const handleDownloadIconClick = () => {
		console.log('download icon clicked');
	};

	return (
		<div className="mx-auto">
			<Navbar
				projectName="Backend Example"
				onBurgerIconClick={handleBurgerIconClick}
				onSaveIconClick={handleSaveIconClick}
				onUserIconClick={handleUserIconClick}
				onDownloadIconClick={handleDownloadIconClick}
				onShareIconClick={handleShareIconClick}
			/>
			<FlowContainer isSidebarOpen={isSidebarOpen} />
			<Footer />
		</div>
	);
}
