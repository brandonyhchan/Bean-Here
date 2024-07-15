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

## Launch Frontend Server

1. change directory to `spire-coffee`
2. Execute command `npm run dev`

## Launch Backend Server

1. change directory to `backend`
2. Execute the command `npm start`

Should get the message "Server is running on http://localhost:4000/

# Prisma

Prisma is an ORM that is being used by the backend to communicate with the database. For all instructions, please check that you are in the `backend` directory.

If updates are made to the migration.sql file and the migration has already been applied to the database

1. run `npx prisma migrate dev`

This will create a new migration.

## Seeding the database

1. Ensure that the `.env` file in the `backend` directory contains the `SEEDER_ACCOUNT_PASSWORD` variable.
2. Run `npx tsx prisma/seed.ts`
