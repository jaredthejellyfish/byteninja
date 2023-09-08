/* eslint-disable @typescript-eslint/no-var-requires */

const { faker } = require('@faker-js/faker');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


async function getAllCourses() {
    return await prisma.course.findMany({ select: { id: true } });
}


async function getAllSkills() {
    const bagOfSkills = faker.lorem.words({ min: 20, max: 30 })
    return bagOfSkills.split(' ')

}


async function seedCourseSkills() {
    const courses = await getAllCourses()
    const skills = await getAllSkills()

    // three skills per course
    for (let i = 0; i < courses.length; i++) {
        // pick a random set of 3 skills
        const threeRandomSkills = skills.sort(() => 0.5 - Math.random()).slice(0, 3)
        await prisma.course.update({
            where: { id: courses[i].id },
            data: {
                skills: threeRandomSkills
            }
        });

        console.log(`- Course ${courses[i].id} updated with skills: ${threeRandomSkills}`)
    }
}


seedCourseSkills()