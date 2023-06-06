import { createTheme } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { BackendFactory } from 'dnd-core';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';

import { ThemeContext } from '@/context';

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

export function AppWrapper({
	dndBackend,
	children,
}: {
	children: string | JSX.Element | JSX.Element[];
	dndBackend: BackendFactory;
}) {
	const [theme, setTheme] = useState(DEFAULT_THEME);
	const [materialTheme, setMaterialTheme] = useState(darkMaterialTheme);

	const handleThemeChange = (themeName: string) => {
		setTheme(themeName);

		if (lightThemes.includes(themeName)) {
			setMaterialTheme(lightMaterialTheme);
		} else {
			setMaterialTheme(darkMaterialTheme);
		}
	};

	useEffect(() => {
		document.querySelector('html')?.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<>
			<Head>
				<title>DevLingo</title>
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="description" content="Devlingo" key="desc" />
			</Head>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
			<DndProvider backend={dndBackend}>
				<ThemeContext.Provider
					value={{ currentTheme: theme, setTheme: handleThemeChange }}
				>
					<MaterialThemeProvider theme={materialTheme}>
						{children}
					</MaterialThemeProvider>
				</ThemeContext.Provider>
			</DndProvider>
		</>
	);
}
