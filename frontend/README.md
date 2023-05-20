# DevLingo Frontend

This repository hosts the DevLingo frontend.

## Setup

The repository uses [pnpm](https://pnpm.io/) as a package manager, install it with:

```shell
npm i -g pnpm
```

You can then update the dependencies with

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

### Development

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

### Docker

To build and run the application using `docker` make sure to first install [docker](https://www.docker.com/) on your machine.
Once available use the docker compose commands such as:

```shell
docker compose up --build
```

## Tooling

### Linting

You can execute the following commands to lint the project:

#### EsLint

```shell
pnpm run lint:code
```

#### StyleLint

```shell
pnpm run lint:style
```

#### Formatting

```shell
pnpm run format
```

Notes: There are pre-commit hooks that will execute these commands on pertinent code before its being committed.

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
