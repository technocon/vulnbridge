/**
 * Simple smoke test to verify that vitest runs correctly in the backend package.
 */

import { describe, expect, it } from 'vitest';

describe('backend package bootstrap', () => {
  it('runs a placeholder test', () => {
    expect(1 + 1).toBe(2);
  });

  it('has NODE_ENV set to test', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
});