# Copilot Instructions

## Repository purpose

This repository is a monorepo for the Book Review Platform. Keep changes aligned with a scalable architecture that separates applications, shared packages, documentation, and automation.

## Conventions

- Do not create application code unless explicitly requested.
- Prefer clear folder boundaries: apps for runnable projects, packages for shared libraries, docs for documentation, and scripts for automation.
- Keep documentation concise and maintainable.
- Favor incremental, well-structured changes over large one-off edits.

## Architecture Decisions

- Monorepo: npm workspaces
- Frontend: React + Vite + TypeScript
- Backend: NestJS + TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Authentication: Google OAuth for login
- Public access: Public book pages must not require login
- Admin access: Book management must require Google login
- Deployment target for POC: Local Docker Compose
- Package manager: npm

## Development Boundaries

- Frontend code must stay inside apps/web.
- Backend code must stay inside apps/api.
- Shared types must stay inside packages/shared-types.
- Documentation must stay inside docs.
- Do not introduce TypeORM.
- Do not introduce Firebase Authentication.
- Do not introduce Nx or Turborepo unless explicitly requested.

## Application Type
- Multi-user Book Review Platform.

## User Model
- Registered users log in using Google OAuth.
- Each user owns their own book entries and reviews.
- Public visitors can view only public user profiles and public book entries.
- Admin capabilities are planned for V1 scope but should be implemented only when explicitly requested.

## Domain Rules

- Every Book record belongs to exactly one User.
- A user can only manage their own books.
- Public APIs must never expose PRIVATE books.
- Every API that accesses books must enforce ownership checks unless explicitly marked as a public endpoint.
- Never generate APIs that allow users to update or delete another user's books.

## Always consult:
- docs/requirements.md
- docs/architecture/adr-001-project-decisions.md
- docs/architecture/domain-rules.md