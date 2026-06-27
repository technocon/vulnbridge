import { z } from 'zod';

export const SeveritySchema = z.enum(['Low', 'Medium', 'High', 'Critical']);
export type Severity = z.infer<typeof SeveritySchema>;

export const ScannerSourceSchema = z.enum(['Snyk', 'Dependabot', 'Wiz', 'Inspector', 'Mock']);
export type ScannerSource = z.infer<typeof ScannerSourceSchema>;

export const AutonomyTierSchema = z.enum(['T0', 'T1', 'T2', 'T3']);
export type AutonomyTier = z.infer<typeof AutonomyTierSchema>;

export const AutonomyConfigSchema = z.object({
  tier: AutonomyTierSchema,
  enabled: z.boolean(),
  autoApprove: z.boolean(),
});
export type AutonomyConfig = z.infer<typeof AutonomyConfigSchema>;

export const FindingSchema = z.object({
  id: z.string().uuid().optional(),
  externalId: z.string().optional(),
  source: ScannerSourceSchema,
  cve: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  severity: SeveritySchema,
  status: z.enum(['Open', 'InReview', 'Fixing', 'Fixed', 'Ignored']),
  repositoryId: z.string().uuid().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});
export type Finding = z.infer<typeof FindingSchema>;

export const TenantSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.string().datetime(),
});
export type Tenant = z.infer<typeof TenantSchema>;

export const RepositorySchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  name: z.string(),
  url: z.string().url(),
});
export type Repository = z.infer<typeof RepositorySchema>;

export const ScannerIntegrationSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  source: ScannerSourceSchema,
  config: z.record(z.any()), // Encrypted fields will be handled at the DB layer
});
export type ScannerIntegration = z.infer<typeof ScannerIntegrationSchema>;

export const AuditLogEntrySchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  action: z.string(),
  metadata: z.record(z.any()),
  timestamp: z.string().datetime(),
});
export type AuditLogEntry = z.infer<typeof AuditLogEntrySchema>;

export const FixPRSchema = z.object({
  id: z.string().uuid(),
  findingId: z.string().uuid(),
  repositoryId: z.string().uuid(),
  prNumber: z.number(),
  url: z.string().url(),
  status: z.enum(['Open', 'Merged', 'Closed']),
});
export type FixPR = z.infer<typeof FixPRSchema>;

export const RiskNarrativeSchema = z.object({
  id: z.string().uuid(),
  findingId: z.string().uuid(),
  content: z.string(),
  aiGenerated: z.boolean(),
});
export type RiskNarrative = z.infer<typeof RiskNarrativeSchema>;
