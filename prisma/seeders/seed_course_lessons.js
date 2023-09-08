/* eslint-disable @typescript-eslint/no-var-requires */

const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function getAllCourses() {
  return await prisma.course.findMany({ select: { id: true } });
}

async function generateLesson() {
  const lessons = [];
  for (let i = 0; i < 3; i++) {
    const name = faker.lorem.words({ min: 2, max: 3 });
    const description = faker.lorem.paragraph();
    const image = faker.image.urlLoremFlickr({ category: 'candid' });
    lessons.push({ name, description, image });
  }
  return lessons;
}

async function seedCourseLessons() {
  const courses = await getAllCourses();

  for (let i = 0; i < courses.length; i++) {
    const lessons = await generateLesson();
    for (let j = 0; j < lessons.length; j++) {
      await prisma.lesson.create({
        data: {
          name: lessons[j].name,
          description: lessons[j].description,
          image: lessons[j].image,
          courseId: courses[i].id,
        },
      });
    }
    console.log(`- Lessons created for course with id: ${courses[i].id}`);
  }
}

seedCourseLessons();
