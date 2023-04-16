FROM node:19-slim as base
RUN npm i -g pnpm

FROM base as install
WORKDIR /app/
ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}
COPY package.json pnpm-lock.yaml tsconfig.json .npmrc ./
RUN pnpm install --frozen-lockfile --ignore-scripts


FROM install as build
WORKDIR /app/
COPY next.config.js next-i18next.config.js postcss.config.js tailwind.config.js ./
COPY src src
RUN pnpm run build


FROM install AS app
WORKDIR /app/
ENV NODE_ENV="production"
ARG SERVER_PORT
COPY public public
COPY next-i18next.config.js next.config.js ./
RUN npm i -g pnpm
CMD ["pnpm", "run", "start"]
