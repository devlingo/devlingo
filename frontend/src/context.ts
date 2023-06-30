import { createContext } from 'react';

export const ThemeContext = createContext<{
	currentTheme: string;
	setTheme: (theme: string) => void;
	backgroundColor: string;
}>({
	currentTheme: 'dracula',
	setTheme: () => undefined,
	backgroundColor: 'yellow',
});
