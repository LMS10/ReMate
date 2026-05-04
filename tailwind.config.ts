import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '3xl': ['32px', { lineHeight: '42px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        xl: ['20px', { lineHeight: '32px' }],
        '2lg': ['18px', { lineHeight: '26px' }],
        lg: ['16px', { lineHeight: '26px' }],
        md: ['14px', { lineHeight: '24px' }],
        sm: ['13px', { lineHeight: '22px' }],
        xs: ['12px', { lineHeight: '20px' }],
      },

      colors: {
        white: '#FFFFFF',
        error: '#F74747',
        black: {
          100: '#4B4B4B',
          200: '#333236',
          300: '#171717',
          400: '#000000',
        },
        gray: {
          100: '#F8FAFC',
          200: '#EEEEEE',
          300: '#D9D9D9',
          400: '#9FA6B2',
          500: '#787486',
        },
        blue: {
          100: '#E8EEF7',
          200: '#1251AA',
        },
        chip: {
          green: '#7AC555',
          purple: '#760DDE',
          orange: '#FFA500',
          blue: '#76A5EA',
          pink: '#E876EA',
        },
        status: {
          'wait-bg': '#FFF8C1',
          'wait-text': '#A69300',
          'approval-bg': '#E4FBDC',
          'approval-text': '#2BA600',
          'return-bg': '#FFE4E4',
          'return-text': '#CA2323',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
