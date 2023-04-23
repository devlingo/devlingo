-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigurationOption" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT,
    "schema" JSONB NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfigurationOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConfigurationOption_key_isEnabled_idx" ON "ConfigurationOption"("key", "isEnabled");

-- CreateIndex
CREATE UNIQUE INDEX "ConfigurationOption_key_projectId_key" ON "ConfigurationOption"("key", "projectId");

-- AddForeignKey
ALTER TABLE "ConfigurationOption" ADD CONSTRAINT "ConfigurationOption_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
