# Spire-Cawfee

<!-- At some point we want to include a description of the app here -->

# Technology Stack

## Frontend

Vite v5.3.1
React Typescript v18.3.1

## Backend

Node v18.18.0 (LTS)
Apollo Server
Prisma ORM v5.16.2

# Setup Development Environment

Recommended to use VS Code for editing.

## Recommended VS Code Extensions

- Auto rename tag
- Better Comments
- Code Spell Checker
- Colorize
- Dotenv
- ESLint
- Gitlens
- GraphQL
- HTML CSS Support
- Prettier
- Prisma

## Frontend

1. Change directory to `spire-coffee`
2. Execute command `npm install`

## Backend

1. Change directory to `backend`
2. Execute command `npm install`

# Launch Development Server locally

## Manual Option

To launch both development servers in their own terminal:

### Launch Frontend Server

1. Change directory to `spire-coffee`
2. Execute command `npm run dev`

### Launch Backend Server

1. Change directory to `backend`
2. Execute the command `npm start`

Should get the message "Server is running on http://localhost:4000/

## Script Option

1. Execute command `./dev.sh`

# Prisma

Prisma is an ORM that is being used by the backend to communicate with the database. For all instructions, please check that you are in the `backend` directory.

For changes made to prisma.schema

1. Run `npx prisma generate`

If updates are made to the migration.sql file and the migration has already been applied to the database

1. Run `npx prisma migrate dev`

This will create a new migration.

## Seeding the database

Use these steps when updating the seed data for the database.

1. Ensure that the `.env` file in the `backend` directory contains the `SEEDER_ACCOUNT_PASSWORD` variable.
2. Run `npx prisma migrate dev` to create a new migration
3. Run `npx tsx prisma/seed.ts`
