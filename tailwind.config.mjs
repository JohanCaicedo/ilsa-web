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
			
			// 4. COLORES
			colors: {
				// --- TUS COLORES DE ILSA (Conectados a global.css) ---
				// Ahora puedes usar: bg-ilsa-blue, text-ilsa-blue, border-ilsa-blue
				ilsa: {
					blue: 'var(--ilsa-blue)',         // #4E7CCE
					'blue-dark': 'var(--ilsa-blue-dark)', // #375a9e
					'text-dark': 'var(--ilsa-text-dark)', // #111827
					'text-gray': 'var(--ilsa-text-gray)', // #4b5563
					'bg-light': 'var(--ilsa-bg-light)',   // #f9fafb
				},

				// --- COLORES DE SHADCN ---
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},

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