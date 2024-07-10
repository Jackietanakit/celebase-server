## Getting Started

Firstly, clone this repository

```bash
$ git clone https://github.com/Celebase/celebase-server.git
```

Next, install all nessesary data

```bash
$ npm install
```

Next, install docker for running postgreSQL

[Docker installation](https://www.docker.com)

```bash
$ docker-compose up
```

## Migrate data

```bash
$ npx prisma generate

$ npx prisma migrate dev --name "name of the change"
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Working with NestJs

install NestCLI

```bash
$ npm install -g @nestjs/cli
```

create new resource

```bash
$ nest g resource name_of_the_resource
```

## Project Structure

- src/
  - types/
    - entities/ (all entity in project)
    - enum/ (all enum in project)
  - xxx/ (resource)
    - dto/ (schema for create and update)
    - service (connect with database)
    - controller (call service, createAPI)
