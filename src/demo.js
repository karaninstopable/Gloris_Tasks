// Walks through the main Prisma Client features.
// Run with: npm run demo
const prisma = require('./client');

const title = (t) => console.log(`\n=== ${t} ===`);
const show = (data) => console.log(JSON.stringify(data, null, 2));

async function main() {
  // 1. READ ALL
  title('1. findMany: all users');
  show(await prisma.user.findMany());

  // 2. READ ONE with relations (acts like SQL JOINs)
  title('2. findUnique + include: user with profile and posts');
  show(
    await prisma.user.findUnique({
      where: { email: 'asha@example.com' },
      include: { profile: true, posts: { include: { categories: true } } },
    })
  );

  // 3. SELECT only some fields
  title('3. select: only name and email');
  show(await prisma.user.findMany({ select: { name: true, email: true } }));

  // 4. FILTERING
  title('4. where: published posts with more than 50 views');
  show(
    await prisma.post.findMany({
      where: { published: true, views: { gt: 50 } },
      select: { title: true, views: true },
    })
  );

  // 5. FILTER BY RELATION
  title('5. relation filter: users who have at least one published post');
  show(
    await prisma.user.findMany({
      where: { posts: { some: { published: true } } },
      select: { name: true },
    })
  );

  // 6. SORT + PAGINATION
  title('6. orderBy + take: top 2 most viewed posts');
  show(
    await prisma.post.findMany({
      orderBy: { views: 'desc' },
      take: 2,
      select: { title: true, views: true },
    })
  );

  // 7. CREATE
  title('7. create: new user with a profile');
  const newUser = await prisma.user.create({
    data: {
      email: 'kiran@example.com',
      name: 'Kiran',
      profile: { create: { bio: 'Intern', city: 'Chennai' } },
    },
    include: { profile: true },
  });
  show(newUser);

  // 8. UPDATE
  title('8. update: change name');
  show(
    await prisma.user.update({
      where: { id: newUser.id },
      data: { name: 'Kiran Kumar' },
    })
  );

  // 9. ATOMIC UPDATE
  title('9. increment: add 1 view to a post');
  const post = await prisma.post.findFirst({ where: { published: true } });
  show(
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
      select: { title: true, views: true },
    })
  );

  // 10. UPSERT
  title('10. upsert: update if exists, else create');
  show(
    await prisma.category.upsert({
      where: { name: 'News' },
      update: {},
      create: { name: 'News' },
    })
  );

  // 11. AGGREGATE
  title('11. aggregate: count / total / average / max views');
  show(
    await prisma.post.aggregate({
      _count: true,
      _sum: { views: true },
      _avg: { views: true },
      _max: { views: true },
    })
  );

  // 12. GROUP BY
  title('12. groupBy: number of posts per author');
  show(
    await prisma.post.groupBy({
      by: ['authorId'],
      _count: { id: true },
    })
  );

  // 13. TRANSACTION: all succeed or all roll back
  title('13. $transaction: create a user and a post together');
  const [tUser, tPost] = await prisma.$transaction(async (tx) => {
    const u = await tx.user.create({
      data: { email: 'txn@example.com', name: 'Txn User' },
    });
    const p = await tx.post.create({
      data: { title: 'Created in a transaction', authorId: u.id },
    });
    return [u, p];
  });
  show({ user: tUser.name, post: tPost.title });

  // 14. ERROR HANDLING
  title('14. error handling: duplicate email (code P2002)');
  try {
    await prisma.user.create({
      data: { email: 'asha@example.com', name: 'Duplicate' },
    });
  } catch (e) {
    console.log('Caught Prisma error code:', e.code, '(unique constraint failed)');
  }

  // 15. DELETE (cascade removes the profile too, see onDelete: Cascade)
  title('15. delete: remove user (profile is deleted via Cascade)');
  await prisma.user.delete({ where: { id: newUser.id } });
  console.log('Deleted user:', newUser.email);
  console.log(
    'Profile still exists?',
    (await prisma.profile.findUnique({ where: { userId: newUser.id } })) !== null
  );

  // 16. RAW SQL (safe, parameterized)
  title('16. $queryRaw: raw SQL when you need it');
  const rows = await prisma.$queryRaw`SELECT COUNT(*) AS total_posts FROM Post`;
  console.log('Total posts:', Number(rows[0].total_posts));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
