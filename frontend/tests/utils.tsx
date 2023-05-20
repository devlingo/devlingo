import { act, render, RenderOptions } from '@testing-library/react';
import i18next from 'i18next';
import { TestBackend } from 'react-dnd-test-backend';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { AppWrapper } from '@/wrapper';

import enAssets from '../public/locales/en/assets.json';

const defaultNS = 'common';

const resources = {
	en: {
		assets: enAssets,
	},
};

i18next.createInstance();
i18next.use(initReactI18next).init({
	lng: 'en',
	resources,
	defaultNS,
});

const Wrapper = ({ children }: any) => {
	return (
		<I18nextProvider i18n={i18next}>
			<AppWrapper dndBackend={TestBackend}>{children}</AppWrapper>
		</I18nextProvider>
	);
};

const customRender = (ui: any, options?: RenderOptions<any, any, any>) =>
	render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/dom';

export { act, customRender as render };
