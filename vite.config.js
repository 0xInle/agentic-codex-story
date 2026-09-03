import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    exclude: ['**/node_modules/**', 'tests/e2e/**'],
  },
  base: '/agentic-codex-story/',
});
