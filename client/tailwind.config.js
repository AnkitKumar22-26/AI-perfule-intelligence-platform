/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // All tokens read from CSS variables (defined in index.css) so a single
        // `dark` class toggle on <html> re-themes the entire app instantly.
        ink: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        surface2: 'rgb(var(--c-surface-2) / <alpha-value>)',
        ivory: 'rgb(var(--c-text) / <alpha-value>)',
        mauve: 'rgb(var(--c-muted) / <alpha-value>)',
        gold: 'rgb(var(--c-primary) / <alpha-value>)',
        amber: 'rgb(var(--c-accent) / <alpha-value>)',
        rose: 'rgb(var(--c-secondary) / <alpha-value>)',
        primary: 'rgb(var(--c-primary) / <alpha-value>)',
        secondary: 'rgb(var(--c-secondary) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'vial-gold': 'linear-gradient(90deg, rgb(var(--c-primary)) 0%, rgb(var(--c-accent)) 100%)',
        'glow-radial': 'radial-gradient(circle at 30% 20%, rgb(var(--c-primary) / 0.18), transparent 55%)'
      },
      boxShadow: {
        vial: '0 0 24px rgb(var(--c-primary) / 0.25)',
        glass: '0 8px 32px rgb(15 23 42 / 0.12)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
}