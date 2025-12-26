import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Build a static site suitable for GitHub Pages by outputting to `docs/`.
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: 'index.html'
		})
	}
};

export default config;
