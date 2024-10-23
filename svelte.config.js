import adapter from '@sveltejs/adapter-static'
import { sveltePreprocess } from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: sveltePreprocess(),

	kit: {
		adapter: adapter(),
	},
}
