FROM node:20 AS base
WORKDIR /usr/src/app
RUN apt-get update && apt-get upgrade -y && apt-get install -y mc
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json .npmrc ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/graphql-common ./packages/graphql-common
RUN pnpm install --filter=frontend --frozen-lockfile
RUN pnpm install --filter=graphql-common --frozen-lockfile
EXPOSE 3000

FROM base AS prod-build
COPY apps/frontend ./apps/frontend
RUN pnpm --filter=frontend build

FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY --from=prod-build /usr/src/app/apps/frontend/.next ./.next
COPY --from=prod-build /usr/src/app/apps/frontend/package.json ./package.json
COPY --from=prod-build /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD ["pnpm", "start"]
