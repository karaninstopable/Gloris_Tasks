// Fills the database with sample data.
// Run with: npm run seed
const prisma = require('./client');

async function main() {
  // Clean old data (children first)
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  // Nested create: User + Profile + Posts (+ categories) in ONE call
  await prisma.user.create({
    data: {
      email: 'asha@example.com',
      name: 'Asha',
      profile: { create: { bio: 'Backend developer', city: 'Chennai' } },
      posts: {
        create: [
          {
            title: 'Getting started with Prisma',
            content: 'Prisma is a type-safe ORM.',
            published: true,
            views: 120,
            categories: {
              // connectOrCreate: reuse the category if it exists, else create it
              connectOrCreate: [
                { where: { name: 'Database' }, create: { name: 'Database' } },
                { where: { name: 'Tutorial' }, create: { name: 'Tutorial' } },
              ],
            },
          },
          {
            title: 'Prisma relations explained',
            content: 'One-to-one, one-to-many, many-to-many.',
            published: true,
            views: 80,
            categories: {
              connectOrCreate: [
                { where: { name: 'Database' }, create: { name: 'Database' } },
              ],
            },
          },
          { title: 'Draft post', published: false },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      email: 'ravi@example.com',
      name: 'Ravi',
      profile: { create: { bio: 'Full-stack developer', city: 'Bengaluru' } },
      posts: {
        create: [
          {
            title: 'Node.js tips',
            published: true,
            views: 45,
            categories: {
              connectOrCreate: [
                { where: { name: 'Tutorial' }, create: { name: 'Tutorial' } },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: { email: 'meena@example.com', name: 'Meena' },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
