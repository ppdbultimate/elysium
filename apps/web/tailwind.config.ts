/* eslint-disable @typescript-eslint/no-var-requires */
import sharedConfig from '@elysium/tailwind-config';
import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [sharedConfig],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-inter)', ...fontFamily.sans],
        averta: ['var(--font-averta)', ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
};

export default config;
