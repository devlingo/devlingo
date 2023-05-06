/* istanbul ignore next */
import '@/styles/globals.css';
import 'reactflow/dist/style.css';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default appWithTranslation(App);
