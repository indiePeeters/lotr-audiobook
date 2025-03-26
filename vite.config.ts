import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './', // Ensures relative paths
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for src
      '#': path.resolve(__dirname, 'tests'), // Alias for tests (if needed)
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.ts', // Optional setup file
  },
});
