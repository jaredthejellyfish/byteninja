/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `lessons` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "lessons_name_key";

-- AlterTable
ALTER TABLE "lessons" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lessons_slug_key" ON "lessons"("slug");
