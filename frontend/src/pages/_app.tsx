/* istanbul ignore next */
import 'reactflow/dist/style.css';
import '@/styles/globals.css';
import '@/styles/react-flow.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App({ Component, pageProps }: AppProps) {
	return (
		<div data-theme="dracula">
			<Head>
				<title>DevLingo</title>
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="description" content="Devlingo" key="desc" />
			</Head>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
			<DndProvider backend={HTML5Backend}>
				<Component {...pageProps} />
			</DndProvider>
		</div>
	);
}

export default appWithTranslation(App);
