# Backend Monorepo

## Installation:

1. make sure to have `pnpm` installed globally (`npm i -g pnpm`)
2. run `pnpm install -r`
3. run `pnpm run prisma:generate`

To update dependencies:

-   run `pnpm up -r --latest`

To lunch the dev environment, use docker - `docker compose up`.
Make sure to have an up to date `.env.development` file in the root of your repository.

### env file

Make sure to have the following values in your .env file

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY=<secret>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=devlingo-development.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=devlingo-development
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=devlingo-development.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=964073085066
NEXT_PUBLIC_FIREBASE_APP_ID=1:964073085066:web:f2b667bffdd19f1fcd3573
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BKXZT3HK3
OPENAI_KEY=<secret>
FIREBASE_PROJECT_ID=devlingo-development
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-4c3j8@devlingo-development.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=<secret>
```

The `<secret>` values should be given to you by someone with access and communicated securely.

## Git

### Commits and Branches

The repository follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) which are enforced using
[CommitLint](https://github.com/conventional-changelog/commitlint) (executed via husky on commit). This should also be the
format of the PR title - this is enforced using a github action.

## Commands

### Test commands:

`pnpm run test` - run tests.
`pnpm run coverage` - run tests with coverage.

### Linting commands:

`pnpm run lint` - lint with auto fix using ESLint.
`pnpm run check` - lint with only check using ESLint.
`pnpm run format` - format all supported files using prettier.

### Dev commands:

`pnpm run dev:frontend` - run the frontend locally.
`pnpm run dev:backend` - run the backend locally.

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
