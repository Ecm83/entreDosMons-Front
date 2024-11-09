/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin'), require('./tailwind/button.js')],

	darkMode: 'class',

	theme: {
		extend: {
			boxShadow: {
				custom: '5px 10px 14px 0 rgba(0, 0, 0, 0.3)'
			},
			scale: {
				50: '1.03'
			},

			active: {
				scale: 0.95
			},

			colors: {
				primary: {
					50: '#000000'
				},

				secondary: {
					50: '#83072D',
					100: '#ff0000'
				},

				ok: {
					50: '#12a351',
					100: '#008000'
				},

				upload: {
					50: '#5564ec',
					100: '#1414b8'
				},

				delete: {
					50: '#d84237',
					100: '#ff0000'
				}
			}
		}
	}
};
