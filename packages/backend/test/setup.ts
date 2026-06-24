/**
 * Backend test setup — runs before every test file.
 *
 * - Clears all mocks between tests.
 * - Sets NODE_ENV to test.
 * - Loads shared test utilities.
 */

import { afterEach, vi } from 'vitest';

process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'silent';

afterEach(() => {
  vi.clearAllMocks();
});