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
module.exports = {
	important: true,
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
	],
	plugins: [
		require('@tailwindcss/typography'),
		require('daisyui'),
		require('tailwindcss-elevation'),
	],
	daisyui: {
		logs: false,
		themes: [...lightThemes, ...darkThemes],
	},
	safelist: ['h-[calc(100vh-64px)]'],
};
