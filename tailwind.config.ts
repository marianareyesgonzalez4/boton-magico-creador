
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
				'body': ['Noto Sans', 'system-ui', 'sans-serif'],
				'serif': ['Playfair Display', 'serif'],
				'alternates': ['Montserrat Alternates', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Nueva paleta de colores Chocó Artesanal
				'choco': {
					// Modo claro
					'bg-primary': '#f4f2f0',
					'text-primary': '#181311',
					'text-secondary': '#886f63',
					'card-bg': '#ffffff',
					'cta': '#e55d19',
					'cta-hover': '#ff7c3a',
					'neutral-border': '#e5dfdc',
					'decorative-ochre': '#cc8b47',
					'decorative-olive': '#8b956d',
					
					// Modo oscuro (se aplicarán automáticamente con dark:)
					'dark-bg-primary': '#1b1513',
					'dark-text-primary': '#f4f2f0',
					'dark-text-secondary': '#bba89b',
					'dark-card-bg': '#2a201e',
					'dark-cta': '#ff7c3a',
					'dark-cta-hover': '#ff9d6a',
					'dark-neutral-border': '#4a3e3a',
					'dark-decorative-ochre': '#8b6d3a',
					'dark-decorative-olive': '#5a6147',
				},
				// Mantenemos algunos colores del sistema anterior para compatibilidad
				'tesoros': {
					'green': '#22c55e',
					'blue': '#3b82f6',
					'brown': '#886f63',
					'gold': '#e55d19',
					'red': '#ef4444',
					'light': '#f4f2f0',
					'cream': '#ffffff',
					'dark': '#181311',
					'orange': '#e55d19',
					'purple': '#8b5cf6',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
