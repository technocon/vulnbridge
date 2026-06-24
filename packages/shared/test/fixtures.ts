/**
 * Static fixture data for tests.
 *
 * Use these when you need a known, deterministic set of data
 * rather than random-generated factories.
 */

import type { Finding } from '../../src/types';

// ---------------------------------------------------------------------------
// Known findings for pagination / filtering tests
// ---------------------------------------------------------------------------
export const FIXTURE_FINDINGS: readonly Finding[] = Object.freeze([
  {
    id: 'fix-00001',
    tenantId: 'tenant-alpha',
    scannerId: 'snyk',
    scannerFindingId: 'SNYK-JS-LODASH-56789',
    title: 'Prototype Pollution in lodash',
    description: 'lodash versions before 4.17.21 are vulnerable to prototype pollution via defaultsDeep.',
    severity: 'high',
    status: 'open',
    packageName: 'lodash',
    packageVersion: '4.17.20',
    fixVersion: '4.17.21',
    cve: 'CVE-2020-8203',
    source: 'snyk',
    firstSeenAt: new Date('2026-01-15T10:30:00Z'),
    updatedAt: new Date('2026-01-15T10:30:00Z'),
    scanMetadata: {},
  },
  {
    id: 'fix-00002',
    tenantId: 'tenant-alpha',
    scannerId: 'dependabot',
    scannerFindingId: 'dependabot-001',
    title: 'Cross-site Scripting in express',
    description: 'Express versions before 4.18.0 are vulnerable to XSS via improper content-type parsing.',
    severity: 'medium',
    status: 'triaged',
    packageName: 'express',
    packageVersion: '4.17.1',
    fixVersion: '4.18.0',
    cve: 'CVE-2022-24999',
    source: 'dependabot',
    firstSeenAt: new Date('2026-02-01T08:00:00Z'),
    updatedAt: new Date('2026-02-02T14:00:00Z'),
    scanMetadata: {},
  },
  {
    id: 'fix-00003',
    tenantId: 'tenant-alpha',
    scannerId: 'wiz',
    scannerFindingId: 'wiz-003',
    title: 'Sensitive port exposed to internet',
    description: 'Port 5432 (PostgreSQL) is exposed to 0.0.0.0/0 on security-group sg-app.',
    severity: 'critical',
    status: 'open',
    packageName: null,
    packageVersion: null,
    fixVersion: null,
    cve: null,
    source: 'wiz',
    firstSeenAt: new Date('2026-03-01T06:00:00Z'),
    updatedAt: new Date('2026-03-01T06:00:00Z'),
    scanMetadata: {},
  },
  {
    id: 'fix-00004',
    tenantId: 'tenant-beta',
    scannerId: 'aws-inspector',
    scannerFindingId: 'aws-004',
    title: 'Kernel CVE in Amazon Linux 2',
    description: 'A flaw was found in the Linux kernel that allows privilege escalation.',
    severity: 'high',
    status: 'resolved',
    packageName: 'kernel',
    packageVersion: '4.14.200-1',
    fixVersion: '4.14.200-2',
    cve: 'CVE-2024-12345',
    source: 'aws-inspector',
    firstSeenAt: new Date('2026-01-10T12:00:00Z'),
    updatedAt: new Date('2026-03-15T09:00:00Z'),
    scanMetadata: {},
  },
  {
    id: 'fix-00005',
    tenantId: 'tenant-alpha',
    scannerId: 'snyk',
    scannerFindingId: 'SNYK-JS-AXIOS-60000',
    title: 'Server-Side Request Forgery in axios',
    description: 'axios before 1.6.0 allows SSRF via user-controlled URLs.',
    severity: 'medium',
    status: 'open',
    packageName: 'axios',
    packageVersion: '1.5.0',
    fixVersion: '1.6.0',
    cve: 'CVE-2023-45857',
    source: 'snyk',
    firstSeenAt: new Date('2026-04-01T10:00:00Z'),
    updatedAt: new Date('2026-04-01T10:00:00Z'),
    scanMetadata: {},
  },
]);

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------
export const FIXTURE_PAGINATION = Object.freeze({
  page: 1,
  limit: 20,
  total: 5,
});

// ---------------------------------------------------------------------------
// Severity / status enums
// ---------------------------------------------------------------------------
export const SEVERITY_ORDER: readonly string[] = Object.freeze([
  'critical',
  'high',
  'medium',
  'low',
  'info',
]);

export const STATUS_VALUES: readonly string[] = Object.freeze([
  'open',
  'triaged',
  'resolved',
  'dismissed',
]);