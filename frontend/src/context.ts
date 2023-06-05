import { createContext } from 'react';

export const ThemeContext = createContext<{
	currentTheme: string;
	setTheme: (theme: string) => void;
}>({ currentTheme: 'dracula', setTheme: () => undefined });
