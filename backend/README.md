# Backend Monorepo

## Installation:

1. make sure to have `pnpm` installed globally (`npm i -g pnpm`)
2. run `pnpm install`

To update dependencies:

-   run `pnpm up`

To lunch the dev environment, use docker - `docker compose up`.
Make sure to have an up to date `.env` file in the root of your repository.

Note: `.env` files must be .gitignored.

## Commands

### Test commands:

`pnpm run test` - run tests.

### Linting commands:

`pnpm run code:lint` - lint with auto fix using ESLint.
`pnpm run code:check` - lint with only check using ESLint.
`pnpm run format` - format all supported files using prettier.

### Nest commands:

`pnpm run build <serviceName>`

The variable `serviceName` can be any project defined in the `nest-cli.json`, e.g. `backend` or `tasker`.

This applies to the other commands in the package.json that use nest. For example, `pnpm run start <serviceName>` etc.

### Docker Compose Commands:

`docker compose up --build <servicename>` - bring up the service and build the images.
`docker compose up --detach <servicename>` - runs docker in the background and returns the terminal.

You can use the docker compose `profiles` to build and run only one of the services, e.g. `docker-compose up --profile backend`.

### Prisma ORM

-   `pnpm dlx prisma init` - To initialise the prisma model from scratch
-   `pnpm dlx prisma db pull` - To generate the schema into the `schema.prisma` file from an already existing database
-   `pnpm dlx prisma generate` - you will need to run this command every time there is a change in the schema so that Prisma can build its client.

#### Prisma Migration Commands

-   `pnpm dlx prisma migrate dev --name initial-migration --create-only` - To create an initial migration. --create will only create the migration without applying it
-   `pnpm dlx prisma migrate dev --name added_job_title` - To create a migration and apply it too
-   `pnpm dlx prisma migrate resolve --applied 20221031120318_init` - To mark a migration as applied so that prisma will skip over it and will run the rest of the migrations
-   `pnpm dlx prisma migrate dev` - To apply the created migrations
-   `pnpm dlx prisma format` - To format the prisma schema file according to prisma standards

## How to migrate locally?

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
