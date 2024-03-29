/* c4 ignore next */
import 'reactflow/dist/style.css';
import '@/styles/globals.css';
import '@/styles/react-flow.css';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppWrapper } from '@/wrapper';

function App({ Component, pageProps }: AppProps): React.ReactElement {
	return (
		<AppWrapper dndBackend={HTML5Backend}>
			<Component {...pageProps} />
		</AppWrapper>
	);
}

export default appWithTranslation(App);
