# Book Review Platform Requirements

## Business objective

Create a personal reading tracker and public reading journal where a user can manage their own book list across three states: read, currently reading, and planning to read. The platform should allow users to log reading periods, add reviews, and share their reading progress publicly in version 1.

## User roles

- Visitor: Can view a public user profile and see the books the user has read, is currently reading, and plans to read.
- Registered user: Can create an account, log in, add books to their personal lists, set reading dates, write reviews, and update their reading status.
- Admin: Can manage user accounts and support platform operations as needed.

## Functional requirements

### Account and authentication
- Users can log in using their Google account.
- Users can register for an account and log in securely using Google authentication.
- Logged-in users can manage their own reading data.
- Users can update their profile information and account settings.

### Personal book tracking
- Users can add books to one of three categories: read, currently reading, or planning to read.
- Users can set a start date and end date for books in the read and currently reading categories.
- Users can set a planned start date or planned completion date for books in the planning category.
- Users can update or remove books from their personal lists.

#### BookStatus:
- PLANNED
- IN_PROGRESS
- COMPLETED

### Visibility:
- PUBLIC
- PRIVATE

### Recommendation Level:
- HIGHLY_RECOMMENDED
- RECOMMENDED
- NOT_RECOMMENDED

### Reviews
- Users can add a review to a book in their personal collection.
- Users can edit or delete their own reviews.
- Reviews should include a rating and optional written comments.

#### Rating:
1-5 stars

### Public visibility
- Public users can view a user’s reading lists and the associated books in each category.
- Public users can see the books marked as read, currently reading, and planning to read.
- Public users can view reviews that the user has made public.

## Book fields

Each tracked book entry should include:
- Title
- Author
- Category: read, currently reading, or planning to read
- Start date
- End date or planned date
- Review status
- Rating (if reviewed)
- Review text (optional)
- Optional notes
- Book Thumbnail iImage

## Admin capabilities

Admins should be able to:
- Manage user accounts
- Support account recovery or moderation needs
- Review or remove inappropriate content if required
- Maintain platform stability and user access

## Public page capabilities

Public visitors should be able to:
- View a user’s reading timeline and book lists
- Browse books by status category
- See the user’s reviews and reading progress
- Access the public profile without logging in

## Non-functional requirements

- The experience should be simple, intuitive, and easy to use for personal tracking.
- The platform should work reliably for login, saving lists, and updating reviews.
- User data should be stored securely and remain private unless explicitly shared publicly.
- The system should be responsive on common desktop and mobile devices.

## Out of scope items

Version 1 does not include:
- Social features such as follows, friends, or comments from other users
- Book discovery or recommendation engine
- Shared reading groups or community challenges
- Advanced analytics or statistics dashboards
- Multi-user collaborative libraries
