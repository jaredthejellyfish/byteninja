-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "subCourseId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_subCourseId_fkey" FOREIGN KEY ("subCourseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
