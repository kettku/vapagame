import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default output directory is 'build'
			pages: 'build',
			assets: 'build',
			fallback: '404.html', // Essential for Single Page Apps (SPA)
			precompress: false,
			strict: true
		}),
		paths: {
			// Replace 'your-repo-name' with your actual repository name
			base: process.env.NODE_ENV === 'production' ? '/vapagame' : '',
		}
	}
};

export default config;
