/** @type {import('tailwindcss').Config} */

import theme from 'pbstyles/styles/tailwind-theme';

export default {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  prefix: 'pbc-',
  corePlugins: {
    preflight: false,
  },
  theme: {
    ...theme,
    extend: {
      ...theme.extend,
      animation: {
        show: 'show 300ms ease-in forwards',
        hide: 'hide 200ms ease-out forwards',
      },
      keyframes: {
        show: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        hide: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')({ strategy: 'class' }), require('@tailwindcss/typography')],
};
