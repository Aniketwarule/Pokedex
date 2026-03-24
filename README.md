# Pokedex Assignment

Short full-stack Pokedex built with Next.js App Router, TypeScript, Prisma (PostgreSQL), tRPC (React Query), and Material UI.

## What It Does

- Stores Pokemon in SQL through Prisma.
- Exposes typed tRPC routes for single fetch, batch fetch, and type filtering.
- Renders reusable UI components with Material UI.
- Includes cursor pagination in filtered results.

## Routes

- `/part-1`: search one Pokemon by name and render one row.
- `/part-2`: search multiple Pokemon using comma-separated names and render a table.
- `/part-3`: filter Pokemon by type and load more with pagination.

## Tech Stack

- Next.js
- TypeScript
- Prisma + PostgreSQL
- tRPC + React Query
- Material UI

## Run Locally

1. Install dependencies:
	`npm install`
2. Set DB connection in `.env`:
	`DATABASE_URL=...`
3. Push schema and generate client:
	`npm run db:push`
4. Seed mock data:
	`npm run db:seed`
5. Start app:
	`npm run dev`

## Useful Scripts

- `npm run dev` - start development server.
- `npm run typecheck` - run TypeScript checks.
- `npm run lint` - run lint checks.
- `npm run db:studio` - open Prisma Studio.
