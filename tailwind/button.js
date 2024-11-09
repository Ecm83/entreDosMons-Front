// Archivo: /src/tailwind/button.js
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents }) {
	addComponents({
		'.btn': {
			padding: '0.4rem 1rem',
			borderRadius: '0.5rem',
			fontWeight: '600',
			transition: 'all 0.2s ease-in-out',
			outline: 'none !important', // Sobrescribe cualquier outline
			boxShadow: 'none !important', // Elimina sombras
			'&:focus': {
				outline: '2px solid #4CAF50',
				outlineOffset: '2px'
			},
			'&:active': {
				outline: 'none !important', // Sobrescribe cualquier outline al hacer clic
				boxShadow: 'none !important' // Elimina sombras al hacer clic
			}
		},
		'.btn-accept': {
			backgroundColor: '#28a745',
			color: '#fff',
			'&:hover': {
				backgroundColor: '#218838'
			},
			'&:active': {
				outline: 'none !important', // Sobrescribe cualquier outline al hacer clic
				boxShadow: 'none !important' // Elimina sombras al hacer clic
			}
		}
	});
});
