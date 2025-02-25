# Build image
FROM node:20 AS build
WORKDIR /usr/src/app

# Step 1: Copy root-level and workspace-level essential files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tsconfig.json ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Step 2: Copy backend-specific files
COPY apps/backend/package.json ./apps/backend/

# Reinstall backend-specific dependencies (as it's part of the monorepo)
RUN pnpm install --filter=backend --frozen-lockfile

# Step 3: Copy backend source code and configuration files
COPY apps/backend ./apps/backend

# Build the backend application
RUN pnpm --filter=backend build

# ------------------------------
# Production-ready runtime image
# ------------------------------
FROM node:20 AS production
WORKDIR /usr/src/app

# Copy only the built application and required files from the previous stage
COPY --from=build /usr/src/app/apps/backend/dist ./dist
COPY apps/backend/package.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 4000

# Command to start the backend
CMD ["node", "dist/index.js"]