import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF6',
          100: '#F8F4EA',
          200: '#F1EADB',
        },
        sage: {
          50: '#F2F6F1',
          100: '#E2EBE0',
          200: '#C6D7C2',
          300: '#A3BD9E',
          400: '#7E9E79',
          500: '#5F815B',
          600: '#486845',
          700: '#395337',
          800: '#2E432C',
          900: '#263826',
        },
        mist: {
          50: '#F2F6F9',
          100: '#E4EDF3',
          200: '#CBDCE7',
          300: '#A9C4D6',
          400: '#83A7BF',
          500: '#6789A4',
          600: '#526F86',
        },
        lavender: {
          50: '#F6F4FA',
          100: '#ECE8F4',
          200: '#D9D1E9',
          300: '#BDB0D8',
          400: '#9E8CC4',
          500: '#8270AC',
        },
        apricot: {
          50: '#FDF6EF',
          100: '#F8E9D9',
          200: '#F0D3B6',
          300: '#E5B88C',
          400: '#D69A64',
          500: '#C07E46',
        },
        ink: {
          DEFAULT: '#2F3632',
          soft: '#5A635E',
          muted: '#8A938D',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(47, 54, 50, 0.10)',
        card: '0 1px 2px rgba(47,54,50,0.04), 0 8px 30px -12px rgba(47,54,50,0.12)',
        lift: '0 18px 46px -18px rgba(47,54,50,0.22)',
      },
      maxWidth: {
        content: '1200px',
        prose: '760px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
          '50%': { transform: 'scale(1.08)', opacity: '0.9' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.9s ease both',
        breathe: 'breathe 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
