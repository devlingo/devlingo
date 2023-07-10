import { createContext } from 'react';

import { ThemeColors } from '@/types';

export const ThemeContext = createContext<{
	currentTheme: string;
	setTheme: (theme: string) => void;
	themeColors?: ThemeColors;
}>({
	currentTheme: 'dracula',
	setTheme: () => undefined,
	themeColors: undefined,
});
