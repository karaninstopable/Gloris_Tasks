# Prisma Blog Demo

A small Node.js project that demonstrates **Prisma ORM** with a SQLite database
(no database server needed).

## What it demonstrates

| Concept | Where |
|---|---|
| Schema, models, field types, attributes | `prisma/schema.prisma` |
| One-to-One (User - Profile) | `schema.prisma` |
| One-to-Many (User - Post) | `schema.prisma` |
| Many-to-Many (Post - Category) | `schema.prisma` |
| Referential action (`onDelete: Cascade`) | `schema.prisma` |
| Migrations | `npm run setup` |
| Seeding with nested creates | `src/seed.js` |
| CRUD, filters, include/select, sorting, pagination | `src/demo.js` |
| Aggregation, groupBy, transactions, error codes, raw SQL | `src/demo.js` |
| GUI to view data | `npm run studio` |

## Database design

```
User 1 ---- 1 Profile
User 1 ---- * Post
Post * ---- * Category
```

## How to run

Requirements: Node.js 18 or newer.

```bash
npm install          # install dependencies
npm run setup        # create the SQLite DB + tables (migration), also seeds data
npm run demo         # run all the example queries
npm run studio       # open Prisma Studio in the browser (optional)
```

To start over: `npm run reset`

## Project structure

```
prisma-blog-demo/
  prisma/schema.prisma   <- data models and relations
  src/client.js          <- single PrismaClient instance
  src/seed.js            <- sample data
  src/demo.js            <- query examples (run this)
  .env                   <- DATABASE_URL
  package.json
```

## Key idea

1. Define models in `schema.prisma`
2. `prisma migrate dev` creates the SQL tables
3. Prisma Client is generated automatically, giving type-safe methods like
   `prisma.user.findMany()`
