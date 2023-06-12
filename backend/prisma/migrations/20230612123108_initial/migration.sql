/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `DesignVersion` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `DesignVersion` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "DesignVersion_designId_version_key";

-- AlterTable
ALTER TABLE "DesignVersion" DROP COLUMN "updatedAt",
DROP COLUMN "version";
