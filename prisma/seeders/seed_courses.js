/* eslint-disable @typescript-eslint/no-var-requires */

const { faker } = require('@faker-js/faker');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllUsers() {
  return await prisma.user.findMany({ select: { id: true } });
}

async function seedCourses(
  usersAmount,
  createAmountPerUser
) {
  const users = await getAllUsers();

  for (let i = 0; i < usersAmount; i++) {
    const oneRandomUser = users[Math.floor(Math.random() * users.length)];
    for (let j = 0; j < createAmountPerUser; j++) {
      const name = faker.lorem.words({ min: 3, max: 5 })
      await prisma.course.create({
        data: {
          name: name,
          slug: name.split(' ').join('-').toLowerCase(),
          description: faker.lorem.paragraph(),
          image: faker.image.urlLoremFlickr({ category: 'candid' }),
          authorId: oneRandomUser.id,
          created_at: faker.date.recent(),
          updated_at: faker.date.recent(),
        },
      });
      console.log(`- Course ${name} created with id: ${oneRandomUser.id}`)
    }
  }
}

seedCourses(10, 5)