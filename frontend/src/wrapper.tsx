import { BackendFactory } from 'dnd-core';
import Head from 'next/head';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';

import { ThemeContext } from '@/utils/context';

export const DEFAULT_THEME = 'dracula';

export function AppWrapper({
	dndBackend,
	children,
}: {
	children: string | JSX.Element | JSX.Element[];
	dndBackend: BackendFactory;
}) {
	const [theme, setTheme] = useState(DEFAULT_THEME);

	return (
		<div data-theme={theme}>
			<Head>
				<title>DevLingo</title>
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="description" content="Devlingo" key="desc" />
			</Head>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
			<DndProvider backend={dndBackend}>
				<ThemeContext.Provider value={{ setTheme }}>
					{children}
				</ThemeContext.Provider>
			</DndProvider>
		</div>
	);
}
