## Running the Application

There are two ways to start the application:

### Option A: Using Docker

Launch the application in a fully containerized environment:

```bash
docker compose up --build -d
```

### Option B: Manual Start

#### 1. Start Database and Redis

Make sure the required services (database and Redis) are running locally.

Alternatively, you can start them using Docker:
```bash
docker-compose up db redis
```

#### 2. Build Shared GraphQL Code
Before starting the Frontend or Backend, ensure that `graphql-common` is built:
```bash
pnpm --filter=graphql-common run build
```

#### 3. Start the Backend (GraphQL API)
Set up environment variables and run the following commands:

```bash
nvm use
pnpm --filter=backend run dev
```

#### 4. Start the Frontend

Set up environment variables and run the following commands:

```bash
nvm use
pnpm --filter=frontend run dev
```

The application will be available at: **http://localhost:3000**