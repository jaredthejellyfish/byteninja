/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `courses` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "courses_name_key";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");
