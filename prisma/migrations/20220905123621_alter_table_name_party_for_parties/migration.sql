/*
  Warnings:

  - You are about to drop the `partys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "partys" DROP CONSTRAINT "partys_userId_fkey";

-- DropTable
DROP TABLE "partys";

-- CreateTable
CREATE TABLE "parties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "coordination" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "draft" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "parties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
