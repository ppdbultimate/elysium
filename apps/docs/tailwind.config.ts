import type { Config } from 'tailwindcss';
import sharedConfig from '@elysium/tailwind-config';

const config: Config = {
  content: ['../../packages/ui/src/**/*.{js,jsx,ts,tsx}'],
  presets: [sharedConfig],
};

export default config;
