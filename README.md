# VulnBridge Monorepo

AI-Powered Vulnerability Remediation for Mid-Market Engineering Teams.

## Architecture Overview

VulnBridge is built as a TypeScript monorepo using npm workspaces.

### Components

- **`packages/backend`**: Fastify-based Node.js API. Handles vulnerability ingestion, scoring, and patch generation.
- **`packages/frontend`**: React + Vite application. Provides a unified backlog view and configuration interface.
- **`packages/shared`**: Shared TypeScript types and utilities used by all packages.
- **`packages/scanner-core`**: Scanner ingestion engine and adapter interfaces.

### Stack

- **Language**: TypeScript
- **Backend**: Fastify
- **Frontend**: React, Vite
- **Testing**: Vitest
- **Linting**: ESLint
- **Formatting**: Prettier
- **Monorepo Tooling**: npm workspaces

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Development

Start the backend:
```bash
npm run dev -w @vulnbridge/backend
```

Start the frontend:
```bash
npm run dev -w @vulnbridge/frontend
```

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## CI/CD

GitHub Actions are configured in `.github/workflows/ci.yml` to run build, lint, and tests on every push and pull request.
