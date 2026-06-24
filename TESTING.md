# Testing Guide — VulnBridge

This document describes the testing conventions, coverage targets, and
patterns used across the VulnBridge monorepo.

---

## Test Runner

We use **[Vitest](https://vitest.dev)** v3.x for all testing — unit,
integration, and component tests. Vitest was chosen for its native ESM
support, fast watch mode, Jest-compatible API, and tight Vite integration
(for the frontend package).

## Running Tests

```bash
# Run all tests in all packages
npm test

# Watch mode (re-runs on file changes)
npm run test:watch

# With coverage report
npm run test:coverage
```

To run tests for a single package:

```bash
npm -w packages/backend test
npm -w packages/shared test
npm -w packages/frontend test
npm -w packages/scanner-core test
```

## Coverage Target

| Metric       | Target |
|--------------|--------|
| Statements   | ≥ 80%  |
| Branches     | ≥ 80%  |
| Functions    | ≥ 80%  |
| Lines        | ≥ 80%  |

Thresholds are enforced in each package's `vitest.config.ts`. CI will
fail if coverage drops below these thresholds on new code.

Coverage is _measured on `src/` only_ — test files and barrel exports
(`index.ts`) are excluded.

## Package Structure

```
packages/
  shared/          — Domain types, test factories, fixtures, helpers
    src/            # Production code (types, shared logic)
    test/           # Tests for the shared package + re-exported test utilities
      index.ts       # Barrel — import mock tools as @vulnbridge/shared/test
      factories.ts   # buildMockFinding(), buildMockTenant(), etc.
      fixtures.ts    # FIXTURE_FINDINGS, pagination helpers
      helpers.ts     # expectAsync(), paginatedResponse(), sleep()
      mock-tenants.ts# TEST_TENANTS, TENANT_API_KEYS

  backend/          — Fastify API server
    src/
    test/
      setup.ts       # Global setup (clear mocks, set NODE_ENV)

  frontend/         — React frontend (Vite)
    src/
    test/
      setup.ts       # Global setup (cleanup afterEach)

  scanner-core/     — Scanner adapter interfaces
    src/
    test/
```

## Test Conventions

### File naming

- Test files go in the `test/` directory of each package.
- Name them `*.test.ts` (or `*.test.tsx` for frontend components).
- Mirror the `src/` structure when possible:
  ```
  src/routes/findings.ts  →  test/routes/findings.test.ts
  ```

### What to test

| Layer         | What to test                                                      |
|---------------|-------------------------------------------------------------------|
| **Shared**    | Factories, fixtures, helpers, tenant mocks — these are consumed   |
|               | by other packages and must be reliable.                           |
| **Backend**   | Route handlers, middleware, service functions, database queries,  |
|               | tenant isolation, pagination, filtering, sorting, auth, errors.   |
| **Frontend**  | Component rendering, user interactions, state transitions,        |
|               | API calls (mocked), responsive layout.                            |
| **Scanner**   | Adapter interface compliance, config validation, webhook parsing, |
|               | polling scheduler, mock scanner behaviour.                        |

### Patterns

1. **Arrange-Act-Assert** — structure each test clearly:
   ```ts
   // Arrange
   const finding = buildMockFinding({ severity: 'critical' });

   // Act
   const result = escalateFinding(finding);

   // Assert
   expect(result.needsApproval).toBe(true);
   ```

2. **Factory functions over raw objects** — use `buildMockFinding()`,
   `buildMockTenant()`, etc. with overrides instead of constructing
   objects inline. This keeps tests resilient to schema changes.

3. **Tenant isolation** — every cross-tenant test must explicitly verify
   that tenant A's data is invisible to tenant B:
   ```ts
   const alphaData = await fetchFindings('tenant-alpha');
   const betaData = await fetchFindings('tenant-beta');
   expect(alphaData).not.toEqual(betaData);
   ```

4. **No shared mutable state** — reset counters and clear mocks in
   `beforeEach` / `afterEach`.

5. **Test error paths** — test 404, 403, 400, and 500 responses, not just
   the happy path.

6. **Integration tests over mocks** — mock at the boundary (HTTP client,
   database interface) rather than deep inside the logic. Prefer in-memory
   databases for repository tests.

## Mock Data

### Factories (`packages/shared/test/factories.ts`)

| Factory               | Returns                         | Key overrides                        |
|-----------------------|---------------------------------|--------------------------------------|
| `buildMockFinding()`  | `Finding`                       | `severity`, `status`, `tenantId`     |
| `buildMockTenant()`   | `Tenant`                        | `tier`, `autonomyDefault`            |
| `buildMockScannerFinding()` | raw scanner payload      | `severity`, `package`, `cvssScore`   |

### Fixtures (`packages/shared/test/fixtures.ts`)

- `FIXTURE_FINDINGS` — 5 known findings across 2 tenants, 3 scanners,
  all severities, all statuses.
- `SEVERITY_ORDER` — `['critical', 'high', 'medium', 'low', 'info']`.
- `STATUS_VALUES` — `['open', 'triaged', 'resolved', 'dismissed']`.

### Mock Tenants (`packages/shared/test/mock-tenants.ts`)

- `TEST_TENANTS` — 3 pre-defined tenants (`tenant-alpha`, `tenant-beta`,
  `tenant-gamma`).
- `getTestTenant(id)` — lookup helper (throws on unknown ID).
- `TENANT_API_KEYS` — Map<tenantId, apiKey> for auth tests.

## CI Pipeline

Defined in `.github/workflows/ci.yml`:

1. **Checkout** + **Node setup** (with npm cache).
2. **`npm ci`** — clean install.
3. **`npm run typecheck`** — TypeScript type checking.
4. **`npm run test:coverage`** — full test suite with coverage.
5. **Coverage artifact upload** — available for 14 days.
6. **Lint** — runs ESLint (separate job, allowed to fail).

Coverage thresholds are enforced by Vitest — if any package falls below
80%, the CI run fails.

---

_Last updated: 2026-06-24_