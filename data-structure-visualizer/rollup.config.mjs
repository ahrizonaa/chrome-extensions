import terser from '@rollup/plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';

export default {
	input: 'build/popup.js',
	watch: true,
	output: {
		file: 'popup/popup.js',
		inlineDynamicImports: true
	},
	plugins: [terser(), bundleSize()]
};
