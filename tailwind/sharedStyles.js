// Archivo: /src/tailwind/shared-styles.js
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents }) {
	addComponents({
		// Gradientes reutilizables
		'.gradient-green': {
			backgroundImage: 'linear-gradient(90deg, #00cc00, #009900)'
		},
		'.gradient-red': {
			backgroundImage: 'linear-gradient(90deg, #ff3333, #b20000)'
		},
		'.gradient-yellow': {
			backgroundImage: 'linear-gradient(90deg, #ffcc00, #cc9900)'
		},
		'.gradient-blue': {
			backgroundImage: 'linear-gradient(90deg, #0066ff, #8a2be2)'
		},

		// Sombra y efectos de hover/active
		'.shadow-default': {
			boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
		},
		'.shadow-hover-neon-green:hover': {
			boxShadow: '0 0 10px #00ff00, 0 0 15px #00ff00'
		},
		'.shadow-hover-neon-red:hover': {
			boxShadow: '0 0 10px #ff3333, 0 0 15px #ff3333'
		},
		'.shadow-hover-neon-yellow:hover': {
			boxShadow: '0 0 10px #ffcc00, 0 0 15px #ffcc00'
		},
		'.shadow-hover-neon-blue:hover': {
			boxShadow: '0 0 10px #0066ff, 0 0 15px #0066ff'
		},

		// Transición y efectos de interacción
		'.transition-base': {
			transition: 'transform 0.2s ease, box-shadow 0.3s ease',
			'&:hover': {
				transform: 'scale(1.05)'
			},
			'&:active': {
				transform: 'scale(0.95)'
			}
		}
	});
});
