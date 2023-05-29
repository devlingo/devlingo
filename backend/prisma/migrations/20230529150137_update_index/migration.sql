/*
  Warnings:

  - A unique constraint covering the columns `[name,version,projectId]` on the table `Design` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Design_name_projectId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Design_name_version_projectId_key" ON "Design"("name", "version", "projectId");
