/*
  Warnings:

  - The primary key for the `party_confirmation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `party_confirmation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "party_confirmation" DROP CONSTRAINT "party_confirmation_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "party_confirmation_pkey" PRIMARY KEY ("id");
