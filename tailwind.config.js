/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			boxShadow: {
				custom: '5px 10px 14px 0 rgba(0, 0, 0, 0.3)'
			},
			scale: {
				50: '1.03'
			},

			colors: {
				primary: {
					50: '#000000'
				},

				secondary: {
					50: '#83072D',
					100: '#ff0000'
				}
			}
		}
	}
};
