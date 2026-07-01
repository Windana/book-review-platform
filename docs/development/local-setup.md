# Local Development Setup

This guide provides instructions for setting up the Book Review Platform for local development using Docker Compose.

## Prerequisites

- **Docker**: [Install Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Docker Compose**: Included with Docker Desktop
- **Node.js**: v18 or higher ([Download](https://nodejs.org/))
- **npm**: v9 or higher (included with Node.js)
- **Git**: For version control

### Verify Prerequisites

```bash
docker --version
docker-compose --version
node --version
npm --version
```

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd book-review-platform
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for all workspaces:
- Root monorepo dependencies
- Backend (`apps/api`)
- Frontend (`apps/web`)
- Shared types (`packages/shared-types`)

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

**For development purposes**, the default values in `.env.example` are suitable for local development. However, you should update:

- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
- `JWT_SECRET`: A secure random string for JWT signing

See [Google OAuth Setup](#google-oauth-setup) for obtaining Google credentials.

### 4. Start Docker Services

Start PostgreSQL and pgAdmin:

```bash
docker-compose up -d
```

Verify services are running:

```bash
docker-compose ps
```

You should see:
- `book-review-db` (PostgreSQL) - Port 5432
- `book-review-pgadmin` (pgAdmin) - Port 5050

### 5. Initialize the Database

**Note**: Prisma setup and database migrations should be run from the `apps/api` directory.

From the project root:

```bash
cd apps/api
npm install
```

When ready to initialize the database (after Prisma is configured):

```bash
npx prisma migrate dev --name init
```

This creates the database schema and generates the Prisma client.

### 6. Start Development Servers

In separate terminal windows, start the backend and frontend:

**Terminal 1 - Backend API**:

```bash
cd apps/api
npm run dev
```

The API will run on `http://localhost:3000`

**Terminal 2 - Frontend**:

```bash
cd apps/web
npm run dev
```

The frontend will run on `http://localhost:5173`

### 7. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **pgAdmin**: http://localhost:5050

## Services Overview

### PostgreSQL Database

- **Host**: `localhost` (or `postgres` from within Docker network)
- **Port**: 5432 (default) or `${DB_PORT}` if configured
- **Username**: `bookuser` (default) or `${DB_USER}`
- **Password**: `bookpassword` (default) or `${DB_PASSWORD}`
- **Database**: `book_review_db` (default) or `${DB_NAME}`

**Connection string for tools**:

```
postgresql://bookuser:bookpassword@localhost:5432/book_review_db
```

### pgAdmin (Database Management)

- **URL**: http://localhost:5050
- **Username**: `admin@example.com` (default) or `${PGADMIN_EMAIL}`
- **Password**: `admin` (default) or `${PGADMIN_PASSWORD}`

#### Register PostgreSQL Server in pgAdmin

1. Open pgAdmin at http://localhost:5050
2. Log in with the default credentials
3. Right-click on "Servers" in the left sidebar → Create → Server
4. Enter server details:
   - **Name**: `book-review-db`
   - **Host name/address**: `postgres`
   - **Port**: `5432`
   - **Username**: `bookuser`
   - **Password**: `bookpassword`
5. Click Save

## Development Workflow

### Running Tests

From the project root or specific app directory:

```bash
npm run test
```

### Linting and Formatting

```bash
npm run lint
npm run format
```

### Building for Production

```bash
npm run build
```

## Common Commands

### Docker Management

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f postgres
docker-compose logs -f pgadmin

# Restart a service
docker-compose restart postgres

# Remove containers and volumes (WARNING: deletes data)
docker-compose down -v
```

### Database Management

```bash
# Connect to PostgreSQL via CLI
docker exec -it book-review-db psql -U bookuser -d book_review_db

# View Prisma schema
cd apps/api && cat prisma/schema.prisma

# Generate Prisma client
cd apps/api && npx prisma generate

# Reset database (WARNING: deletes all data)
cd apps/api && npx prisma migrate reset
```

### Workspace Management

```bash
# List workspace packages
npm query ".workspace"

# Install a package across workspaces
npm install -w "@book-review/shared-types" package-name

# Run scripts across workspaces
npm run lint --workspaces
```

## Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_USER` | `bookuser` | PostgreSQL username |
| `DB_PASSWORD` | `bookpassword` | PostgreSQL password |
| `DB_NAME` | `book_review_db` | PostgreSQL database name |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_HOST` | `postgres` | PostgreSQL host (Docker) or `localhost` (local) |
| `DATABASE_URL` | - | Full PostgreSQL connection string |
| `PGADMIN_EMAIL` | `admin@example.com` | pgAdmin login email |
| `PGADMIN_PASSWORD` | `admin` | pgAdmin login password |
| `PGADMIN_PORT` | `5050` | pgAdmin port |
| `NODE_ENV` | `development` | Node environment |
| `API_PORT` | `3000` | Backend API port |
| `VITE_API_URL` | `http://localhost:3000` | Frontend API endpoint |
| `JWT_SECRET` | - | Secret key for JWT signing (must be set) |
| `GOOGLE_CLIENT_ID` | - | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | - | Google OAuth client secret |

## Google OAuth Setup

To enable Google login during development:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Navigate to APIs & Services → Library
   - Search for "Google+ API"
   - Click Enable
4. Create OAuth credentials:
   - Go to APIs & Services → Credentials
   - Click "Create Credentials" → OAuth client ID
   - Select "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:5173` (frontend)
     - `http://localhost:3000/auth/google/callback` (backend callback)
   - Copy the **Client ID** and **Client Secret**
5. Update `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

## Troubleshooting

### Docker Services Won't Start

**Error**: `port already in use`

- Change port in `.env.local`:
  ```bash
  DB_PORT=5433
  PGADMIN_PORT=5051
  ```
- Or stop the service using the port:
  ```bash
  # On Windows
  netstat -ano | findstr :5432
  taskkill /PID <PID> /F
  ```

### Cannot Connect to Database

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

- Ensure Docker services are running: `docker-compose ps`
- Check connection string in `DATABASE_URL`
- Verify database credentials in `.env.local`

### Prisma Migration Issues

**Error**: `Database connection failed`

- Ensure PostgreSQL is running and healthy: `docker-compose ps`
- Check `DATABASE_URL` is correct
- Wait a few seconds for the database to initialize

### Frontend Can't Connect to API

**Error**: `Failed to fetch from localhost:3000`

- Ensure backend is running: check for "listening on port 3000"
- Check `VITE_API_URL` in `.env.local` and frontend environment
- Verify CORS is enabled in backend

### pgAdmin Can't Connect to Database

- Ensure `book-review-db` server is registered in pgAdmin (see pgAdmin section above)
- Use `postgres` as hostname (not `localhost`)
- Verify credentials match `DB_USER` and `DB_PASSWORD`

## Stopping Development

When finished with development:

```bash
# Stop all Docker services
docker-compose down

# If you want to remove volumes and data
docker-compose down -v
```

## Next Steps

- Read [API Guidelines](../architecture/api-guidelines.md) for backend development
- Read [Coding Standards](../architecture/coding-standards.md) for project conventions
- Review [Domain Rules](../architecture/domain-rules.md) for data ownership rules
- Check [Work Breakdown](./work-breakdown.md) for development tasks

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Docker Compose logs: `docker-compose logs -f`
3. Check if services are healthy: `docker-compose ps`
