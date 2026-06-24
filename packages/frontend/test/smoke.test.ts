/**
 * Simple smoke test to verify frontend test environment.
 */

import { describe, expect, it } from 'vitest';

describe('frontend package bootstrap', () => {
  it('runs a placeholder test', () => {
    expect(typeof window !== 'undefined').toBe(true);
  });
});