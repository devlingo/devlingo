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
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		<AppWrapper dndBackend={HTML5Backend}>
			<Component {...pageProps} />
		</AppWrapper>
	);
}

// @ts-expect-error, typing discrepancy between next and next-i18next
export default appWithTranslation(App);
