/**
 * Domain types used across all VulnBridge packages.
 *
 * These are the core shared type definitions. Tests import from here
 * to type-check mock factories and fixtures.
 */

// ---------------------------------------------------------------------------
// Finding
// ---------------------------------------------------------------------------
export type FindingSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type FindingStatus = 'open' | 'triaged' | 'resolved' | 'dismissed';
export type ScannerSource = 'snyk' | 'dependabot' | 'wiz' | 'aws-inspector';

export interface Finding {
  id: string;
  tenantId: string;
  scannerId: string;
  scannerFindingId: string;
  title: string;
  description: string;
  severity: FindingSeverity;
  status: FindingStatus;
  packageName: string | null;
  packageVersion: string | null;
  fixVersion: string | null;
  cve: string | null;
  source: ScannerSource;
  firstSeenAt: Date;
  updatedAt: Date;
  scanMetadata: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Tenant
// ---------------------------------------------------------------------------
export type AutonomyTier = 'suggest' | 'approve' | 'auto-merge';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  tier: string;
  autonomyDefault: AutonomyTier;
  createdAt: Date;
}

// ---------------------------------------------------------------------------
// API response envelope
// ---------------------------------------------------------------------------
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface SingleResponse<T> {
  data: T;
}