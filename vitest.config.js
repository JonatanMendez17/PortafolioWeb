import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['js/**/*.js'],
      exclude: ['js/main.js', 'js/config/**'],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
      }
    }
  }
});
