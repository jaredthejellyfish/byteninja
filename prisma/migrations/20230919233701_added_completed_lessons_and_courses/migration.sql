-- AlterTable
ALTER TABLE "users" ADD COLUMN     "completedCourses" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "completedLessons" TEXT[] DEFAULT ARRAY[]::TEXT[];
