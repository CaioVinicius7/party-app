/*
  Warnings:

  - You are about to drop the `party_confirmation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "party_confirmation" DROP CONSTRAINT "party_confirmation_partyId_fkey";

-- DropForeignKey
ALTER TABLE "party_confirmation" DROP CONSTRAINT "party_confirmation_userId_fkey";

-- DropTable
DROP TABLE "party_confirmation";

-- CreateTable
CREATE TABLE "party_presence" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "party_presence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "party_presence" ADD CONSTRAINT "party_presence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "party_presence" ADD CONSTRAINT "party_presence_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
