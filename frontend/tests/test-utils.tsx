import { ReactFlowProvider } from '@reactflow/core';
import {
	render,
	renderHook,
	RenderHookOptions,
	RenderHookResult,
	RenderOptions,
} from '@testing-library/react';
import i18next from 'i18next';
import enAssets from 'public/locales/en/assets.json';
import enCommon from 'public/locales/en/common.json';
import { TestBackend } from 'react-dnd-test-backend';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { AppWrapper } from '@/wrapper';

const defaultNS = 'assets';

const resources = {
	en: {
		assets: enAssets,
		common: enCommon,
	},
};

void i18next.use(initReactI18next).init({
	defaultNS,
	lng: 'en',
	ns: [defaultNS],
	resources,
});

const customRender = (
	ui: React.ReactElement,
	options?: RenderOptions<any, any, any>,
) => {
	return render(ui, {
		wrapper: ({ children }: any) => {
			return (
				<I18nextProvider i18n={i18next}>
					<AppWrapper dndBackend={TestBackend}>{children}</AppWrapper>
				</I18nextProvider>
			);
		},
		...options,
	});
};

const renderWithFlowProvider = (
	ui: React.ReactElement,
	options?: RenderOptions<any, any, any>,
) => {
	return render(ui, {
		wrapper: ({ children }: any) => {
			return (
				<ReactFlowProvider>
					<I18nextProvider i18n={i18next}>
						<AppWrapper dndBackend={TestBackend}>
							{children}
						</AppWrapper>
					</I18nextProvider>
				</ReactFlowProvider>
			);
		},
		...options,
	});
};

const customRenderHook = (
	initialProps: any,
	options?: RenderHookOptions<any, any, any, any>,
): RenderHookResult<any, any> => {
	return renderHook(initialProps, {
		wrapper: ({ children }: any) => {
			return (
				<I18nextProvider i18n={i18next}>
					<AppWrapper dndBackend={TestBackend}>{children}</AppWrapper>
				</I18nextProvider>
			);
		},
		...options,
	});
};

export * from '@testing-library/dom';

export {
	customRender as render,
	customRenderHook as renderHook,
	renderWithFlowProvider,
};

export { act } from '@testing-library/react';
