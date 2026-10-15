// Create ONE PrismaClient and reuse it everywhere.
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  // Uncomment to see the SQL Prisma generates:
  // log: ['query'],
});

module.exports = prisma;
