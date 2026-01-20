/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		// Configuración del contenedor central de Shadcn
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			// 1. FUENTES: Conectamos con la variable --font-sans de global.css (Inter)
			fontFamily: {
				sans: ["var(--font-sans)", "sans-serif"],
			},

			// 2. BREAKPOINTS PERSONALIZADOS
			screens: {
				'xs': '475px', // Pantallas móviles horizontales o grandes
				// Tailwind ya incluye sm, md, lg, xl, 2xl automáticamente
			},

			// 3. TAMAÑOS DE LECTURA
			maxWidth: {
				'reading': '65ch', // El ancho perfecto para párrafos de texto (65 caracteres)
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},

			// 4. COLORES (Eliminados: se usan los definidos en global.css con @theme)


			// 5. CONFIGURACIÓN DEL PLUGIN TYPOGRAPHY (PROSE)
			// Esto estiliza el HTML crudo que viene de WordPress
			typography: (theme) => ({
				DEFAULT: {
					css: {
						maxWidth: '100%', // Dejamos que el Layout controle el ancho
						color: 'hsl(var(--foreground))',

						// Enlaces dentro de los artículos
						a: {
							color: 'var(--ilsa-blue)',
							textDecoration: 'none',
							fontWeight: '600',
							'&:hover': {
								textDecoration: 'underline',
							},
						},

						// Títulos
						'h1, h2, h3, h4': {
							color: 'hsl(var(--foreground))',
							fontWeight: '800',
							letterSpacing: '-0.025em', // tight
						},

						// Imágenes (Estilo Apple redondeado)
						img: {
							borderRadius: '1rem', // rounded-2xl
							marginTop: '2em',
							marginBottom: '2em',
						},

						// Citas
						blockquote: {
							borderLeftColor: 'var(--ilsa-blue)',
							fontStyle: 'italic',
						},
					},
				},
			}),
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require('@tailwindcss/typography')
	],
}