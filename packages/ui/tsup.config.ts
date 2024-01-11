import type { Options } from 'tsup';

const { NODE_ENV } = process.env;

export const tsup: Options = {
  // Set to false to prevent 'use client' directive error in esbuild
  splitting: false,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: NODE_ENV === 'production',
  skipNodeModulesBundle: true,
  target: 'es2020',
  entry: ['src/index.tsx'],
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
};
