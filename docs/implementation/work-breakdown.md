# V1 Implementation Work Breakdown

This document breaks the Book Review Platform V1 into small, isolated tasks that can be developed in parallel by separate Copilot agents.

## Guiding principles

- Keep each task focused on one capability or domain slice.
- Avoid overlapping file changes by assigning work to distinct folders or modules.
- Preserve the existing requirements and architecture decisions.
- Do not generate application code in this document; this file only defines the work plan.

## Task list

### Task T01 - Shared domain types and enums
- Task ID: T01
- Task name: Define shared domain types, enums, and DTO contracts for users, books, statuses, visibility, and reviews.
- Responsible agent type: Shared Types / Backend API Agent
- Dependencies: None
- Files/folders likely to be changed: packages/shared-types, docs/implementation
- Acceptance criteria:
  - Shared types exist for book status, visibility, review payloads, and user-owned book records.
  - Contracts are consistent with the documented requirements.
  - No implementation logic is introduced beyond type definitions and contracts.
- Risk level: Low

### Task T02 - Prisma schema and database model setup
- Task ID: T02
- Task name: Create the initial Prisma schema for users, books, and reviews.
- Responsible agent type: Backend Data / Prisma Agent
- Dependencies: T01
- Files/folders likely to be changed: apps/api/prisma, apps/api/src/database
- Acceptance criteria:
  - Prisma models exist for users, books, and reviews.
  - Relationships reflect the ownership model.
  - The schema supports the three book states and review data.
- Risk level: Medium

### Task T03A - Backend auth foundation
- Task ID: T03A
- Task name: Implement backend authentication scaffolding for Google OAuth and session handling.
- Responsible agent type: Backend Auth Agent
- Dependencies: T02
- Files/folders likely to be changed: apps/api/src/auth, apps/api/src/common
- Acceptance criteria:
  - Backend auth flow supports Google login for registered users.
  - Authenticated routes are clearly separated from public routes.
  - Ownership-aware access is ready for downstream modules.
- Risk level: High

### Task T03B - Frontend auth experience
- Task ID: T03B
- Task name: Implement frontend auth UX for Google login, logout, and protected route handling.
- Responsible agent type: Frontend Auth Agent
- Dependencies: T03A
- Files/folders likely to be changed: apps/web/src/auth, apps/web/src/routes, apps/web/src/components
- Acceptance criteria:
  - Users can initiate and complete Google login from the web app.
  - Logged-in and logged-out states are reflected correctly in the UI.
  - Protected screens require authentication and redirect appropriately.
- Risk level: High

### Task T04 - Personal book list API
- Task ID: T04
- Task name: Build the backend API for managing a user’s personal books by status.
- Responsible agent type: Backend Books Agent
- Dependencies: T02, T03A
- Files/folders likely to be changed: apps/api/src/books, apps/api/src/modules
- Acceptance criteria:
  - Users can create, read, update, and delete their own books.
  - Book status values are enforced as planned, in progress, or completed.
  - Ownership checks prevent access to another user’s books.
- Risk level: Medium

### Task T05 - Review API
- Task ID: T05
- Task name: Build the backend API for creating and managing reviews for owned books.
- Responsible agent type: Backend Reviews Agent
- Dependencies: T02, T04
- Files/folders likely to be changed: apps/api/src/reviews, apps/api/src/modules
- Acceptance criteria:
  - Users can add, update, and remove reviews for their own books.
  - Review payloads include rating and optional text.
  - Review actions respect ownership and visibility rules.
- Risk level: Medium

### Task T06 - Public profile API
- Task ID: T06
- Task name: Expose public read-only endpoints for a user’s book lists and reviews.
- Responsible agent type: Backend Public API Agent
- Dependencies: T04, T05
- Files/folders likely to be changed: apps/api/src/public, apps/api/src/profile
- Acceptance criteria:
  - Public endpoints return only data intended for public viewing.
  - Visitors can view a user’s read, reading, and planned books.
  - Private-only data is not exposed through public routes.
- Risk level: Medium

### Task T07 - Authentication and layout shell for the web app
- Task ID: T07
- Task name: Create the initial React application shell, routing structure, and authentication-aware layout.
- Responsible agent type: Frontend App Shell Agent
- Dependencies: T03A
- Files/folders likely to be changed: apps/web/src, apps/web/src/routes, apps/web/src/components
- Acceptance criteria:
  - The web app has a clear route structure for public and authenticated views.
  - The shell supports logged-in and logged-out states.
  - Navigation is ready for feature-specific pages.
- Risk level: Low

### Task T08 - Personal book tracking UI
- Task ID: T08
- Task name: Build the UI for managing a user’s reading list in the three categories.
- Responsible agent type: Frontend Books UI Agent
- Dependencies: T04, T07
- Files/folders likely to be changed: apps/web/src/features/books, apps/web/src/pages
- Acceptance criteria:
  - Users can add books to read, reading, or planned lists.
  - Users can set dates for reading periods or planned dates.
  - The UI calls the personal book list API and shows updates clearly.
- Risk level: Medium

### Task T09 - Review UI and review entry experience
- Task ID: T09
- Task name: Build the UI for adding and editing reviews for owned books.
- Responsible agent type: Frontend Reviews UI Agent
- Dependencies: T05, T08
- Files/folders likely to be changed: apps/web/src/features/reviews, apps/web/src/pages
- Acceptance criteria:
  - Users can create and edit reviews from the book detail or tracking view.
  - Rating and comment fields are captured correctly.
  - Review actions are reflected in the UI after successful API calls.
- Risk level: Medium

### Task T10 - Public profile page and reading summary view
- Task ID: T10
- Task name: Build the public profile experience for viewing another user’s reading lists and reviews.
- Responsible agent type: Frontend Public Profile Agent
- Dependencies: T06, T07
- Files/folders likely to be changed: apps/web/src/pages/public, apps/web/src/features/profile
- Acceptance criteria:
  - Visitors can view a public profile with separate sections for read, reading, and planned books.
  - Public reviews appear in the profile view.
  - The page remains accessible without authentication.
- Risk level: Medium

### Task T11 - Environment, seed data, and developer workflow
- Task ID: T11
- Task name: Prepare local development environment, Docker Compose support, and basic seed data for manual testing.
- Responsible agent type: DevOps / Tooling Agent
- Dependencies: T02, T03A
- Files/folders likely to be changed: docker-compose.yml, scripts, apps/api/prisma/seed.ts, docs
- Acceptance criteria:
  - The local stack can be started with documented commands.
  - Seed data supports basic manual validation of the main flows.
  - The setup remains aligned with the existing deployment target.
- Risk level: Low

### Task T12 - Tests and quality validation
- Task ID: T12
- Task name: Add targeted tests for auth rules, book ownership, and review workflows.
- Responsible agent type: QA / Backend-Frontend Test Agent
- Dependencies: T04, T05, T06, T08, T09
- Files/folders likely to be changed: apps/api/src/**/__tests__, apps/web/src/**/__tests__, docs
- Acceptance criteria:
  - Core business rules are covered by tests.
  - Ownership and public/private visibility rules are validated.
  - The main user journeys are covered at an appropriate level.
- Risk level: Medium
