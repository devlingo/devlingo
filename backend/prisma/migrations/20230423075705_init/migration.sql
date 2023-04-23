-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigSchema" (
    "id" TEXT NOT NULL,
    "version" SERIAL NOT NULL,
    "schema" JSONB NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConfigSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConfigSchema_version_idx" ON "ConfigSchema"("version");

-- CreateIndex
CREATE UNIQUE INDEX "ConfigSchema_version_projectId_key" ON "ConfigSchema"("version", "projectId");

-- AddForeignKey
ALTER TABLE "ConfigSchema" ADD CONSTRAINT "ConfigSchema_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
