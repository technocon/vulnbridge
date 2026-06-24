/**
 * Smoke tests for shared test utilities.
 *
 * These verify the shared package itself — factories, fixtures,
 * helpers, and mock tenants — all work as intended.
 */

import { describe, expect, it } from 'vitest';
import { buildMockFinding, buildMockTenant } from './factories';
import { FIXTURE_FINDINGS, SEVERITY_ORDER, STATUS_VALUES } from './fixtures';
import { paginatedResponse } from './helpers';
import { TEST_TENANTS, getTestTenant, TENANT_API_KEYS } from './mock-tenants';

describe('shared test factories', () => {
  it('buildMockFinding produces a finding with default values', () => {
    const finding = buildMockFinding();
    expect(finding.id).toMatch(/^finding-/);
    expect(finding.severity).toBe('medium');
    expect(finding.status).toBe('open');
    expect(finding.tenantId).toBe('tenant-default');
  });

  it('buildMockFinding honours overrides', () => {
    const finding = buildMockFinding({ severity: 'critical', status: 'resolved' });
    expect(finding.severity).toBe('critical');
    expect(finding.status).toBe('resolved');
  });

  it('buildMockFinding produces unique IDs', () => {
    const a = buildMockFinding();
    const b = buildMockFinding();
    expect(a.id).not.toBe(b.id);
  });

  it('buildMockTenant produces a tenant with sensible defaults', () => {
    const tenant = buildMockTenant();
    expect(tenant.id).toMatch(/^tenant-/);
    expect(tenant.autonomyDefault).toBe('suggest');
  });
});

describe('shared fixtures', () => {
  it('contains 5 known findings', () => {
    expect(FIXTURE_FINDINGS).toHaveLength(5);
  });

  it('has findings across multiple tenants', () => {
    const tenants = new Set(FIXTURE_FINDINGS.map((f) => f.tenantId));
    expect(tenants.has('tenant-alpha')).toBe(true);
    expect(tenants.has('tenant-beta')).toBe(true);
  });

  it('includes all severities', () => {
    const severities = new Set(FIXTURE_FINDINGS.map((f) => f.severity));
    for (const s of ['critical', 'high', 'medium']) {
      expect(severities.has(s as string)).toBe(true);
    }
  });

  it('severity order is correct', () => {
    expect(SEVERITY_ORDER).toEqual(['critical', 'high', 'medium', 'low', 'info']);
  });

  it('status values cover expected states', () => {
    expect(STATUS_VALUES).toEqual(['open', 'triaged', 'resolved', 'dismissed']);
  });
});

describe('shared helpers', () => {
  it('paginatedResponse builds the expected envelope', () => {
    const data = [1, 2, 3];
    const resp = paginatedResponse(data, 1, 10, 3);
    expect(resp.data).toEqual(data);
    expect(resp.pagination).toEqual({ page: 1, limit: 10, total: 3 });
  });
});

describe('mock tenants', () => {
  it('has three test tenants', () => {
    expect(TEST_TENANTS).toHaveLength(3);
  });

  it('getTestTenant returns the right tenant', () => {
    const alpha = getTestTenant('tenant-alpha');
    expect(alpha.name).toBe('Alpha Corp');
  });

  it('getTestTenant throws for unknown tenants', () => {
    expect(() => getTestTenant('nope')).toThrow('Unknown test tenant');
  });

  it('TENANT_API_KEYS maps all tenants', () => {
    for (const t of TEST_TENANTS) {
      expect(TENANT_API_KEYS.get(t.id)).toBe(t.apiKey);
    }
  });
});