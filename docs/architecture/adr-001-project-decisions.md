# ADR-001 Project Decisions

## Application Type
Multi-user application.

## Authentication
Google OAuth only.

## Users
Only the owner can log in.

## Public Access
Public users can browse books without authentication.

## Technology
Frontend: React + Vite
Backend: NestJS
Database: PostgreSQL
ORM: Prisma
Deployment: Docker Compose

## Book Status
PLANNED
IN_PROGRESS
COMPLETED

## Recommendation Levels
HIGHLY_RECOMMENDED
RECOMMENDED
NOT_RECOMMENDED

## Visibility
PUBLIC
PRIVATE

## Authentication Decision

For V1 POC, use simple JWT authentication.

Flow:
1. User logs in with Google from React.
2. React receives Google ID token.
3. React sends Google ID token to NestJS using POST /auth/google.
4. NestJS verifies the Google ID token.
5. NestJS creates or finds the user.
6. NestJS issues an application JWT.
7. React uses the application JWT for authenticated API calls.

Refresh tokens are out of scope for V1.

## JWT Rules

- Use simple access-token JWT only for V1.
- Do not implement refresh tokens unless explicitly requested.
- All protected APIs must use Authorization: Bearer <token>.
- JWT payload should include userId, email, and role.