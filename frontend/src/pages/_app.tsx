/* istanbul ignore next */
import 'reactflow/dist/base.css';
import '@/styles/globals.css';
import '@/styles/react-flow.css';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppWrapper } from '@/wrapper';

function App({ Component, pageProps }: AppProps) {
	return (
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		<AppWrapper dndBackend={HTML5Backend}>
			<Component {...pageProps} />
		</AppWrapper>
	);
}

export default appWithTranslation(App);
