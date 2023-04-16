import { act, render, RenderOptions } from '@testing-library/react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import enHome from '../public/locales/en/home.json';

const defaultNS = 'home';

const resources = {
	en: {
		home: enHome,
	},
};

i18next.createInstance();
i18next.use(initReactI18next).init({
	lng: 'en',
	resources,
	defaultNS,
});

const Wrapper = ({ children }: any) => {
	return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

const customRender = (ui: any, options?: RenderOptions<any, any, any>) =>
	render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/dom';

export { act, customRender as render };
