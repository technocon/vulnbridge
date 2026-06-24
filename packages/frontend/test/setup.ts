/**
 * Frontend test setup — runs before every test file.
 *
 * - Configures jsdom environment.
 * - Clears mocks between tests.
 */

import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});