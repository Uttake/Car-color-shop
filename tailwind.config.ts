import type { Config } from "tailwindcss";
const config: Config = {
    darkMode: ["class"],
    content: [
    "../colorcar/node_modules/flowbite-react/lib/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	wrapper: {
  		base: 'max-w-6xl m-auto'
  	},
  	screens: {
  		'2xl': {
  			max: '1535px'
  		},
  		xl: {
  			max: '1130px'
  		},
		
  		lg: {
  			max: '1023px'
  		},
		tablet: {
			max: '795px'
		},
  		md: {
  			max: '767px'
  		},
  		sm: {
  			max: '511px'
  		}
  	},
  	extend: {
		keyframes: {
			fadeIn: {
			  '0%': { opacity: '0', transform: 'scale(0.95)' },
			  '100%': { opacity: '1', transform: 'scale(1)' },
			},
			fadeOut: {
			  '0%': { opacity: '1', transform: 'scale(1)' },
			  '100%': { opacity: '0', transform: 'scale(0.95)' },
			},
		  },
		  animation: {
			fadeIn: 'fadeIn 300ms ease-out',
			fadeOut: 'fadeOut 300ms ease-out',
		  },
  		colors: {
  			alphablack: 'rgba(14, 14, 14, 0.2);',
			overlay: 'rgba(14, 14, 14, 0.6);',
  			'orange-brdr': '#C53720',
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
  		gridTemplateColumns: {
  			block: 'repeat(auto-fit, minmax(250px, 1fr));'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		backgroundImage: {
			'about' : 'url("/landing-background-second.webp")'
		}
  	}
  },
  plugins: [
    require('flowbite/plugin'),
      require("tailwindcss-animate")
],
};
export default config;
