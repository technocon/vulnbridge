/**
 * Mock factory functions for creating test domain objects.
 *
 * Each factory returns sensible defaults that can be overridden
 * per-test via the `overrides` parameter (partial deep merge).
 */

import type {
  Finding,
  FindingSeverity,
  FindingStatus,
  ScannerSource,
  Tenant,
} from '../../src/types';

// ---------------------------------------------------------------------------
// Counters for generating unique IDs
// ---------------------------------------------------------------------------
let findingCounter = 0;
let tenantCounter = 0;

export function resetCounters(): void {
  findingCounter = 0;
  tenantCounter = 0;
}

// ---------------------------------------------------------------------------
// Finding
// ---------------------------------------------------------------------------
export function buildMockFinding(overrides: Partial<Finding> = {}): Finding {
  findingCounter += 1;
  const id = `finding-${String(findingCounter).padStart(5, '0')}`;
  return {
    id,
    tenantId: 'tenant-default',
    scannerId: 'snyk',
    scannerFindingId: `snyk-${id}`,
    title: 'Test finding',
    description: 'Auto-generated test finding',
    severity: 'medium' as FindingSeverity,
    status: 'open' as FindingStatus,
    packageName: null,
    packageVersion: null,
    fixVersion: null,
    cve: null,
    source: 'snyk' as ScannerSource,
    firstSeenAt: new Date('2026-01-01T00:00:00Z'),
    updatedAt: new Date('2026-01-01T00:00:00Z'),
    scanMetadata: {},
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tenant
// ---------------------------------------------------------------------------
export function buildMockTenant(overrides: Partial<Tenant> = {}): Tenant {
  tenantCounter += 1;
  const id = `tenant-${String(tenantCounter).padStart(3, '0')}`;
  return {
    id,
    name: `Test Tenant ${tenantCounter}`,
    slug: `test-tenant-${tenantCounter}`,
    tier: 'starter',
    autonomyDefault: 'suggest',
    createdAt: new Date('2026-01-01T00:00:00Z'),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Scanner findings — raw shape as emitted by scanners
// ---------------------------------------------------------------------------
export function buildMockScannerFinding(
  overrides: Partial<Record<string, unknown>> = {},
): Record<string, unknown> {
  return {
    id: `ext-${Date.now()}`,
    type: 'vulnerability',
    severity: 'medium',
    package: 'lodash',
    version: '4.17.20',
    title: 'Prototype pollution in lodash',
    description: 'lodash is vulnerable to Prototype Pollution.',
    cvssScore: 6.5,
    ...overrides,
  };
}