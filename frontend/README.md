# DevLingo Frontend

This repository hosts the DevLingo frontend.

## Setup

### PNPM

The repository uses [pnpm](https://pnpm.io/) as a package manager, install it with:

```shell
npm i -g pnpm
```

You can then install the dependencies with:

```shell
pnpm install
```

And update dependency versions with

```shell
pnpm up
```

OR

```shell
pnpm up --latest
```

### ENV

Additionally make sure to create a `.env.development` file in the root of the project with the following content:

```ini
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=devlingo-development.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=devlingo-development
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=devlingo-development.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=xxx
```

Note: The values in `xxx` are secrets and should be sent using a secured medium.

### Firebase

The application uses firebase for authentication. We use locally the firebase emulator package. So make sure to install it
with:

```shell
pnpm add -g firebase-tools
```

Then login with:

```shell
firebase login
```

You will of course need to have access to the firebase projects for this to work. Once you're logged in
you can run the emulators with:

```shell
firebase emulators:start
```

## Development

You can run the application in development mode with:

```shell
pnpm run dev
```

Build the application only with:

```shell
pnpm run build
```

Or start after building with:

```shell
pnpm run start
```

## Docker

To build and run the application using `docker` make sure to first install [docker](https://www.docker.com/) on your machine.
Once available use the docker compose commands such as:

```shell
docker compose up --build
```

## Tooling

### Linting

You can execute the following commands to lint the project:

#### EsLint

To check for linting issues:

```shell
pnpm run check
```

To fix all linting issues:

```shell
pnpm run lint
```

#### Formatting

```shell
pnpm run format
```

### Pre-Commit Hooks

There are pre-commit hooks that will execute these commands on pertinent code before its being committed.
These hooks are installed automatically when calling `pnpm install`.

## Testing

To execute the tests in the shell run:

```shell
pnpm run test
```

You can run with coverage by adding the appropriate flag:

```shell
pnpm run test --coverage
```

Or in watch mode:

```shell
pnpm run test --watch
```
