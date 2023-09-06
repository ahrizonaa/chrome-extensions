import terser from '@rollup/plugin-terser';

export default {
	input: 'build/popup.js',
	output: {
		file: 'popup/popup.js',
		format: 'iife'
	},
	plugins: [terser()]
};
