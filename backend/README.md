# Backend Monorepo

## Installation:

1. make sure to have `pnpm` installed globally (`npm i -g pnpm`)
2. run `pnpm install`

To update dependencies:

-   run `pnpm up -r --latest`

To lunch the dev environment, use docker - `docker compose up`.
Make sure to have an up to date `.env` file in the root of your repository.

Note: `.env` files must be .gitignored.

## Commands

### Test commands:

`pnpm run test` - run tests.

### Linting commands:

`pnpm run lint` - lint with auto fix using ESLint.
`pnpm run check` - lint with only check using ESLint.
`pnpm run format` - format all supported files using prettier.

### Nest commands:

`pnpm run build <serviceName>`

The variable `serviceName` can be any project defined in the `nest-cli.json`, e.g. `backend` or `tasker`.

This applies to the other commands in the package.json that use nest. For example, `pnpm run start <serviceName>` etc.

### Docker Compose Commands:

Here are some example commands:

`docker compose --profile <servicename> up --build` - brings up the service and builds the image.
`docker compose --profile <servicename> up --detach` - runs docker in the background and returns the terminal.
`docker compose --profile all up --build --detach` - brings up all services, builds the images and returns control of the shell.

## How to migrate the DB locally?

Start by running the container for the DB locally with:

```shell
docker compose up db --detach
```

Then export the env variables for the DB connection:

```shell
export DATABASE_URL=postgresql://devlingo:devlingo@0.0.0.0:5432/devlingo
```

And now execute the migration commands:

```shell
pnpm run prisma:migrate:dev
```

Followed by:

```shell
pnpm run prisma:generate
```
