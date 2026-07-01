# Domain Rules

## Ownership

User 1
  └── Books

User 2
  └── Books

Books are never shared between users.

## Visibility

PRIVATE
- Only owner can access.

PUBLIC
- Anyone can view.

## Security

All authenticated APIs must validate ownership before performing CRUD operations.