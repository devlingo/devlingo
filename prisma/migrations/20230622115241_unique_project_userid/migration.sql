/*
  Warnings:

  - A unique constraint covering the columns `[projectId,userId]` on the table `UserProjectPermission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserProjectPermission_projectId_userId_key" ON "UserProjectPermission"("projectId", "userId");
