import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    swc.vite({
      module: { type: 'es6' },
      jsc: {
        transform: {
          useDefineForClassFields: false,
        },
      },
    }),
  ],
  ssr: {
    external: ['supertest']
  },
  test: {
    environment: 'node',
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    deps: {
      interopDefault: true, // Ensures CommonJS and ESM interop is handled
    },
    alias: {
      '@app': '/src/app',
      '@libs/': '/src/libs/',
      '@package/': '/src/packages/'
    },
  },
});