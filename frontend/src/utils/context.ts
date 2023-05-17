import { createContext } from 'react';

export const ThemeContext = createContext<{
	setTheme: (theme: string) => void;
}>({ setTheme: () => undefined });
