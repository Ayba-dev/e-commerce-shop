import type { Config } from 'tailwindcss'

export default {
  content: ['./public/**/*.{html,js,ts}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
    },
  },
  plugins: [],
} satisfies Config
