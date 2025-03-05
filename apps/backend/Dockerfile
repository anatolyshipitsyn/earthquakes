FROM node:20 AS build
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tsconfig.json ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY apps/backend/package.json ./apps/backend/
COPY packages/graphql-common/package.json ./packages/graphql-common/

RUN pnpm install --filter=backend --frozen-lockfile
RUN pnpm install --filter=graphql-common --frozen-lockfile


FROM base AS prod-build
COPY apps/backend ./apps/backend
COPY packages/graphql-common ./packages/graphql-common

RUN pnpm --filter=backend build


# ------------------------------
# Production-ready runtime image
# ------------------------------
FROM node:20 AS production
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/apps/backend/dist ./dist
COPY apps/backend/package.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 4000

CMD ["node", "dist/index.js"]