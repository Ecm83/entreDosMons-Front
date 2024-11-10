// Archivo: /src/tailwind/button.js
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents }) {
	addComponents({
		// Clase base con estilos comunes a todos los botones
		'.btn-base': {
			padding: '8px 16px',
			borderRadius: '8px',
			fontSize: '14px',
			fontWeight: '600',
			color: '#fff',
			cursor: 'pointer',
			border: 'none',
			'@apply shadow-default transition-base': {} // Aplica sombras y transiciones comunes
		},
		'.btn-ok': {
			'@apply btn-base gradient-green shadow-hover-neon-green': {} // Aplica la clase base y gradiente específico
		},
		'.btn-ko': {
			'@apply btn-base gradient-red shadow-hover-neon-red': {}
		},
		'.btn-warn': {
			'@apply btn-base gradient-yellow shadow-hover-neon-yellow': {}
		},
		'.btn-put': {
			'@apply btn-base gradient-blue shadow-hover-neon-blue': {}
		}
	});
});
