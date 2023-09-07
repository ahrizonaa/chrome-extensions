/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/*.{html,js}',
		'./src/**/*.{html,js}',
		'./popup/popup.html',
		'./node_modules/tw-elements/dist/js/**/*.js'
	],
	theme: {
		extend: {}
	},
	plugins: [require('./node_modules/tw-elements/dist/plugin.cjs')],
	darkMode: 'class'
};
