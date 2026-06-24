import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      'packages/shared/vitest.config.ts',
      'packages/backend/vitest.config.ts',
      'packages/frontend/vitest.config.ts',
      'packages/scanner-core/vitest.config.ts',
    ],
  },
});