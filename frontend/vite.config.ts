/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  // Disable minification for debugging
  build: {
    minify: false,
  },
  esbuild: {
    keepNames: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      keepNames: true,
    },
  },
  // Comment above block out for production
});
