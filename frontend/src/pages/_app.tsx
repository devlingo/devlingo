/* istanbul ignore next */
import 'reactflow/dist/style.css';
import '@/styles/globals.css';
import '@/styles/react-flow.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ThemeContext } from '@/utils/context';

function App({ Component, pageProps }: AppProps) {
	const [theme, setTheme] = useState('dracula');

	return (
		<div data-theme={theme}>
			<Head>
				<title>DevLingo</title>
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="description" content="Devlingo" key="desc" />
			</Head>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
			<DndProvider backend={HTML5Backend}>
				<ThemeContext.Provider value={{ setTheme }}>
					<Component {...pageProps} />
				</ThemeContext.Provider>
			</DndProvider>
		</div>
	);
}

export default appWithTranslation(App);
