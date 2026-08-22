# Contributing to CompareX

Welcome to the CompareX development team! This repository is organized as a monorepo with strict role-based ownership. 

## Roles & Ownership

1. **Frontend (`comparex/`)**: React Single Page Application (SPA).
2. **Backend (`backend/`)**: Node.js & Express REST API.
3. **Database (`database/`)**: PostgreSQL schema migrations and seed scripts.
4. **Testing (`testing/`)**: Cross-stack End-to-End (E2E) testing.

## Branching Strategy
We follow a standard feature branching model:
- `feat/frontend-<feature-name>`
- `fix/backend-<issue-name>`
- `chore/database-<migration-name>`

## Pull Request Guidelines
To prevent conflicts and ensure stability, all PRs must follow these rules:

1. **Frontend Changes**: Cannot be merged without passing unit tests (`npm run test -w comparex`) and approval from the Testing role.
2. **Backend Changes**: API endpoints must be documented (OpenAPI/Swagger) before or alongside implementation. Frontend relies on these contracts.
3. **Database Changes**: Any schema changes (adding columns, dropping tables) require a new migration script in `database/` and approval from the Database role.

## Getting Started
To install dependencies for all workspaces:
```bash
npm install
```

To run the full stack locally:
```bash
npm run dev:backend
# In a separate terminal:
npm run dev:frontend
```
