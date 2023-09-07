import terser from '@rollup/plugin-terser';

export default {
	input: 'build/popup.js',
	watch: true,
	output: {
		file: 'popup/popup.js'
	},
	plugins: [terser()]
};
