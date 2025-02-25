# Earthquakes Application

## Overview
This is a monorepo-based application with a **backend** (Node.js + TypeScript + GraphQL) and a **frontend** (React + Next.js). The project uses **pnpm** for package management.

## Prerequisites
Before running the application, ensure you have the correct environment set up:

- **Node.js**: `20.16.0` (specified in `.nvmrc`)
- **pnpm**: `Latest version` (install via `npm install -g pnpm`)
- **Database**: (Specify the database used, e.g., PostgreSQL, MongoDB)
- **Docker** (optional for running the database in a container)

---

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <repository-url>
cd earthquakes
```

### 2. Install Dependencies
Use `pnpm` to install all dependencies across workspaces:
```sh
pnpm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the `apps/backend/` directory with the required environment variables. Example:

```ini
PORT=4000
DATABASE_URL=<your-database-url>
NODE_ENV=development
```

---

## Running the Application

### Backend (GraphQL API)
Start the backend in development mode:
```sh
cd apps/backend
pnpm dev
```
The API will be available at `http://localhost:4000/graphql`.

### Frontend (React + Next.js)
Start the frontend:
```sh
cd apps/frontend
pnpm dev
```
The frontend will be available at `http://localhost:3000`.

---

## Database Setup

### 1. Run Migrations
If using a database, apply migrations with:
```sh
pnpm run migrate
```

### 2. Seed the Database
To populate the database with initial data:
```sh
pnpm run seed
```

---

## Code Quality & Formatting

### Linting
To check for linting issues:
```sh
pnpm lint
```

To automatically fix linting issues:
```sh
pnpm lint:fix
```

### Prettier Formatting
To format code:
```sh
pnpm prettier --write .
```

---

## Building & Running in Production
To build the application:
```sh
pnpm build
```

To start in production:
```sh
pnpm start
```

---

## Testing
(Currently no tests are configured.)

---

## Contribution Guidelines
- Follow ESLint and Prettier rules.
- Use feature branches and submit PRs.
- Run `pnpm lint` before committing.

---

This document provides a structured way to get started with the application. Let me know if you need further customization! 🚀



pnpm exec ts-node ./node_modules/.bin/typeorm migration:generate -d ./src/database/data-source.ts ./src/database/migrations/AddEarthquake