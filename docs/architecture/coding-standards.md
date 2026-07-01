# Coding Standards

These standards apply to the Book Review Platform monorepo and should be followed as implementation begins.

## 1. Architecture boundaries

- Keep frontend code inside apps/web.
- Keep backend code inside apps/api.
- Keep shared types and cross-cutting utilities inside packages/shared-types or other shared packages.
- Keep documentation inside docs and automation inside scripts.
- Do not introduce TypeORM or Firebase Authentication.

## 2. Technology baseline

- Use TypeScript for application and shared code.
- Use React + Vite for the frontend.
- Use NestJS for the backend.
- Use PostgreSQL with Prisma for persistence.
- Use Google OAuth for authentication.

## 3. General coding conventions

- Prefer clear, readable code over clever abstractions.
- Keep functions small and focused on a single responsibility.
- Use descriptive names for variables, functions, classes, and files.
- Use camelCase for variables and functions, PascalCase for components and classes, and kebab-case for file names where appropriate.
- Add comments only when they explain intent, business rules, or non-obvious behavior.

## 4. Frontend standards

- Build UI with functional React components and hooks.
- Keep component logic simple and move reusable behavior into hooks or shared utilities.
- Use typed props and avoid any use of implicit any.
- Keep page-level logic separate from presentation components.
- Use consistent naming for routes, pages, and feature folders.

## 5. Backend standards

- Organize code by feature or module rather than by technical layer alone.
- Keep controllers thin and place business logic in services.
- Validate request input at the API boundary.
- Use Prisma services and repository-style access patterns for persistence.
- Return consistent response shapes for success and error cases.

## 6. Domain and ownership rules

- Each book entry belongs to exactly one user.
- A user may only manage their own books and reviews.
- All authenticated write operations must verify ownership before execution.
- Public endpoints must never expose private data.
- Use explicit enums for statuses and visibility, such as:
  - Book status: PLANNED, IN_PROGRESS, COMPLETED
  - Visibility: PUBLIC, PRIVATE
  - Recommendation level: HIGHLY_RECOMMENDED, RECOMMENDED, NOT_RECOMMENDED

## 7. Authentication and authorization

- Authentication must use Google OAuth only.
- Public pages may be accessible without login.
- Private personal lists and review actions must require authentication.
- Ownership checks must be enforced for all user-specific operations.

## 8. Data and persistence

- Keep Prisma schema changes explicit and versioned through migrations.
- Use meaningful model names and relationships.
- Avoid storing derived values as primary source data when they can be computed.
- Keep validation rules close to the domain model where practical.

## 9. Testing and quality

- Write tests for business rules, auth checks, and critical user flows.
- Prefer small, focused tests over large end-to-end tests for isolated logic.
- Keep code lint-clean and avoid introducing unused code.

## 10. Documentation and change management

- Update the relevant documentation when architecture, APIs, or domain rules change.
- Keep ADRs and domain-rule documents in sync with implementation decisions.
- Document non-obvious workflows, assumptions, and integration points.
