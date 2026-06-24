/**
 * Mock tenant data for multi-tenant isolation tests.
 */

export interface MockTenant {
  id: string;
  name: string;
  slug: string;
  apiKey: string;
}

/**
 * Pre-defined test tenants — use these in integration tests that
 * verify tenant isolation (REQ-NFR-SEC-002).
 */
export const TEST_TENANTS: readonly MockTenant[] = Object.freeze([
  {
    id: 'tenant-alpha',
    name: 'Alpha Corp',
    slug: 'alpha-corp',
    apiKey: 'tnt_key_alpha_test',
  },
  {
    id: 'tenant-beta',
    name: 'Beta Inc',
    slug: 'beta-inc',
    apiKey: 'tnt_key_beta_test',
  },
  {
    id: 'tenant-gamma',
    name: 'Gamma LLC',
    slug: 'gamma-llc',
    apiKey: 'tnt_key_gamma_test',
  },
]);

/**
 * Get a mock tenant by ID. Throws if not found — call only with
 * known IDs from TEST_TENANTS.
 */
export function getTestTenant(id: string): MockTenant {
  const tenant = TEST_TENANTS.find((t) => t.id === id);
  if (!tenant) {
    throw new Error(`Unknown test tenant: ${id}`);
  }
  return tenant;
}

/**
 * Map of tenant ID → API key for test auth middleware.
 */
export const TENANT_API_KEYS: ReadonlyMap<string, string> = new Map(
  TEST_TENANTS.map((t) => [t.id, t.apiKey]),
);