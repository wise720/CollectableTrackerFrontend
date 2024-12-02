## Dockerfile
################################
## BUILD ENVIRONMENT ###########
################################

# Use the official Node.js Alpine image (adjust based on your project's requirements)
# You can find the appropriate image on Docker Hub: https://hub.docker.com/_/node
# In this example, we're using node:20-alpine3.20
# run in termilnal commande line "node --version to get the version of your app"
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build-only

################################
#### PRODUCTION ENVIRONMENT ####
################################

# Use the official NGINX image for production
FROM nginx:stable-alpine AS production

# copy nginx configuration in side conf.d folder
COPY --from=build /app/nginx /etc/nginx/conf.d

# Copy the build output from the dist folder into the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to allow access to the app
EXPOSE 80

# Run Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"] 