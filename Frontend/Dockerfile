# syntax=docker/dockerfile:1

# Build the Vite application with locked Node.js dependencies.
FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# Copy the files required by Vite and produce static assets.
COPY index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY public ./public
COPY src ./src
ARG VITE_SERVER_URL=http://localhost:3002
RUN npm run build

# Serve the compiled frontend from an unprivileged Nginx image.
FROM nginxinc/nginx-unprivileged:1.28-alpine AS runtime
COPY --from=build --chown=nginx:nginx /app/dist/ /usr/share/nginx/html/
USER nginx

# Expose and start Nginx in the foreground.
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
