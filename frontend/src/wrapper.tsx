import { createTheme } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { BackendFactory } from 'dnd-core';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';

import { ThemeContext } from '@/context';
import { ThemeColors } from '@/types';

export const DEFAULT_THEME = 'dracula';

const lightThemes = [
	'acid',
	'autumn',
	'cmyk',
	'corporate',
	'garden',
	'lemonade',
	'light',
	'pastel',
];

const darkThemes = [
	'black',
	'business',
	'coffee',
	'dark',
	'dracula',
	'halloween',
	'luxury',
	'synthwave',
];

export const daisyUIThemes = [...lightThemes, ...darkThemes];

const darkMaterialTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const lightMaterialTheme = createTheme({
	palette: {
		mode: 'light',
	},
});

export function extractThemeColorsFromDOM(): ThemeColors {
	const computedStyles = getComputedStyle(document.querySelector(':root')!);
	return {
		accent: `hsl(${computedStyles.getPropertyValue('--a')}`,
		accentContent: `hsl(${computedStyles.getPropertyValue('--ac')}`,
		accentFocus: `hsl(${computedStyles.getPropertyValue('--af')}`,
		base100: `hsl(${computedStyles.getPropertyValue('--b1')}`,
		base200: `hsl(${computedStyles.getPropertyValue('--b2')}`,
		base300: `hsl(${computedStyles.getPropertyValue('--b3')}`,
		baseContent: `hsl(${computedStyles.getPropertyValue('--bc')}`,
		error: `hsl(${computedStyles.getPropertyValue('--er')}`,
		errorContent: `hsl(${computedStyles.getPropertyValue('--erc')}`,
		info: `hsl(${computedStyles.getPropertyValue('--in')}`,
		infoContent: `hsl(${computedStyles.getPropertyValue('--inc')}`,
		neutral: `hsl(${computedStyles.getPropertyValue('--n')}`,
		neutralContent: `hsl(${computedStyles.getPropertyValue('--nc')}`,
		neutralFocus: `hsl(${computedStyles.getPropertyValue('--nf')}`,
		primary: `hsl(${computedStyles.getPropertyValue('--p')}`,
		primaryContent: `hsl(${computedStyles.getPropertyValue('--pc')}`,
		primaryFocus: `hsl(${computedStyles.getPropertyValue('--pf')}`,
		secondary: `hsl(${computedStyles.getPropertyValue('--s')}`,
		secondaryContent: `hsl(${computedStyles.getPropertyValue('--sc')}`,
		secondaryFocus: `hsl(${computedStyles.getPropertyValue('--sf')}`,
		success: `hsl(${computedStyles.getPropertyValue('--su')}`,
		successContent: `hsl(${computedStyles.getPropertyValue('--suc')}`,
		warning: `hsl(${computedStyles.getPropertyValue('--wa')}`,
		warningContent: `hsl(${computedStyles.getPropertyValue('--wac')}`,
	};
}

export function AppWrapper({
	dndBackend,
	children,
}: {
	children: string | React.ReactElement | React.ReactElement[];
	dndBackend: BackendFactory;
}) {
	const [theme, setTheme] = useState(DEFAULT_THEME);
	const [themeColors, setThemeColors] = useState<ThemeColors | undefined>();
	const [materialTheme, setMaterialTheme] = useState(darkMaterialTheme);

	const handleThemeChange = (themeName: string) => {
		document.querySelector('html')?.setAttribute('data-theme', theme);

		setTheme(themeName);
		if (lightThemes.includes(themeName)) {
			setMaterialTheme(lightMaterialTheme);
		} else {
			setMaterialTheme(darkMaterialTheme);
		}
	};

	useEffect(() => {
		setThemeColors(extractThemeColorsFromDOM);
	}, [theme]);

	return (
		<>
			<Head>
				<title>DevLingo</title>
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="description" content="Devlingo" key="desc" />
			</Head>
			{}
			<DndProvider backend={dndBackend}>
				<ThemeContext.Provider
					value={{
						currentTheme: theme,
						setTheme: handleThemeChange,
						themeColors,
					}}
				>
					<MaterialThemeProvider theme={materialTheme}>
						{children}
					</MaterialThemeProvider>
				</ThemeContext.Provider>
			</DndProvider>
		</>
	);
}
