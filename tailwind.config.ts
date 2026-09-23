import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C8EFF',
          50: '#F0F4FF',
          100: '#E0E8FF',
          200: '#C2D1FF',
          300: '#A3BAFF',
          400: '#85A4FF',
          500: '#6C8EFF',
          600: '#5277E6',
          700: '#3860CC',
          800: '#1F49B3',
          900: '#053299',
        },
        accent: {
          DEFAULT: '#A0B4FF',
          50: '#F5F7FF',
          100: '#EAEEFF',
          200: '#D5DDFF',
          300: '#C0CCFF',
          400: '#ABBFFF',
          500: '#A0B4FF',
          600: '#869DE6',
          700: '#6C86CC',
          800: '#526FB3',
          900: '#385899',
        },
        bg: {
          DEFAULT: '#0A0C14',
          surface: '#10121E',
          card: '#121235',
        },
        success: '#00E5A0',
        warning: '#FFB800',
        danger: '#FF3D57',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #6C8EFF 0%, #A0B4FF 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0C14 0%, #10121E 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(108, 142, 255, 0.3) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'typing': 'typing 2s steps(20) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        typing: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 30px rgba(108, 142, 255, 0.5)',
        'glow-accent': '0 0 30px rgba(160, 180, 255, 0.5)',
        'glow-lg': '0 0 60px rgba(108, 142, 255, 0.4)',
        'card': '0 4px 40px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 60px rgba(108, 142, 255, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
