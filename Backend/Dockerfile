# syntax=docker/dockerfile:1

# Install locked dependencies once for both build and production stages.
FROM node:22-alpine AS dependencies

WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# Compile the TypeScript server with development tooling available.
FROM dependencies AS build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Remove development dependencies without downloading packages again.
FROM dependencies AS production-dependencies
RUN npm prune --omit=dev --no-audit --no-fund

# Run only the compiled server and production dependencies.
FROM node:22-alpine AS runtime
ENV NODE_ENV=production

WORKDIR /app
COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --chown=node:node package.json ./

# Run as the non-root Node.js user.
USER node

# Expose and start the Express and Socket.IO server.
EXPOSE 3002
CMD ["node", "dist/index.js"]
