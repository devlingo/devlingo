FROM node:20-slim AS base
RUN npm i -g pnpm
RUN apt-get update  \
    && apt-get upgrade -y \
    && apt-get install -y openssl  \
    && apt-get clean -y \
    && rm -rf /root/.cache \
    && rm -rf /var/apt/lists/* \
    && rm -rf /var/cache/apt/*

FROM base AS install
WORKDIR /app/
ARG TARGET
COPY package.json pnpm*.yaml tsconfig.json nest-cli.json .npmrc ./
COPY apps/${TARGET}/package.json apps/${TARGET}/package.json
COPY apps/${TARGET}/pnpm-lock.yaml apps/${TARGET}/pnpm-lock.yaml
COPY apps/${TARGET}/tsconfig.app.json apps/${TARGET}/tsconfig.app.json
COPY prisma prisma
RUN pnpm install -r --frozen-lockfile --ignore-scripts
RUN pnpm run prisma:generate

FROM install AS build
WORKDIR /app/
ARG TARGET
COPY apps/shared apps/shared
COPY apps/${TARGET}/src apps/${TARGET}/src
RUN pnpm run build ${TARGET}

FROM base AS app
WORKDIR /app/
ARG SERVER_PORT=8000
ARG TARGET
ARG NODE_OPTIONS=""
EXPOSE ${SERVER_PORT}
ENV SERVER_PORT=${SERVER_PORT}
ENV NODE_ENV=production
ENV NODE_OPTIONS=${NODE_OPTIONS}
COPY --from=build /app/dist/apps/${TARGET} dist
COPY --from=build /app/prisma prisma
COPY --from=build /app/node_modules node_modules
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app
RUN chown -R app:nodejs ./dist
USER app
CMD ["dist/main.js"]
