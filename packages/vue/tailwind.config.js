/** @type {import('tailwindcss').Config} */

import theme from 'pbstyles/styles/tailwind-theme';

export default {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    ...theme,
    extend: {
      ...theme.extend,
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
