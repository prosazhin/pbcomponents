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
    },
  },
  plugins: [require('@tailwindcss/forms')({ strategy: 'class' }), require('@tailwindcss/typography')],
};
