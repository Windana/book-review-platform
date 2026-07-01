# API Guidelines

These guidelines define the expected shape and behavior of the backend API for the Book Review Platform.

## 1. Technology stack

- The API should be implemented with NestJS and TypeScript.
- Persistence should be handled through Prisma and PostgreSQL.
- Authentication should use Google OAuth.

## 2. API design principles

- Use RESTful resource-oriented endpoints.
- Keep endpoint names clear and consistent with the domain.
- Return predictable response shapes for success and error cases.
- Validate request payloads at the API boundary.
- Keep controller logic thin and move business logic into services.

## 3. Authentication and authorization

- Public endpoints may be accessed without authentication.
- Private endpoints must require a valid authenticated user.
- All operations involving a user’s own books or reviews must verify ownership before execution.
- Do not allow one user to update or delete another user’s records.

## 4. Resource conventions

### Books
- Use endpoints for listing, creating, reading, updating, and deleting books.
- Book operations must respect the owner of the book record.
- Book visibility should be handled explicitly through the domain model.

### Reviews
- Reviews should be attached to a specific book and user.
- Only the author may update or delete their own review.
- Public review visibility should follow the agreed visibility rules.

## 5. Request and response conventions

- Use standard HTTP status codes for common outcomes.
- Return a consistent error structure for validation and authorization failures.
- Use DTOs for request validation and clear request contracts.
- Use response DTOs when returning data to clients.

## 6. Data validation

- Validate required fields such as title, author, status, and dates where applicable.
- Enforce business rules in the backend rather than only in the frontend.
- Reject invalid state transitions such as an end date earlier than a start date.

## 7. Ownership and privacy rules

- Private books and reviews must never be exposed through public APIs.
- Public APIs must only return data that is intended to be visible to visitors.
- Authenticated APIs must check the current user against the resource owner before performing write operations.

## 8. Error handling

- Handle validation failures with clear messages.
- Handle authorization failures with a non-sensitive response.
- Log server errors without exposing internal implementation details to clients.

## 9. Documentation and evolution

- Keep API documentation aligned with implementation changes.
- Update these guidelines whenever new endpoints, auth flows, or domain rules are introduced.
