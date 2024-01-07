import type { Options } from 'tsup';

const { NODE_ENV } = process.env;

export const tsup: Options = {
  splitting: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: NODE_ENV === 'production',
  skipNodeModulesBundle: true,
  target: 'es2020',
  entry: ['src/index.tsx'],
  external: ['react'],
};
