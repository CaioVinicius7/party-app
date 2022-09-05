/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `price` on the `parties` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `userId` on table `parties` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "parties" DROP CONSTRAINT "parties_userId_fkey";

-- AlterTable
ALTER TABLE "parties" ALTER COLUMN "banner" DROP NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
