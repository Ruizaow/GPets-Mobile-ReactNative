/*
  Warnings:

  - You are about to drop the column `CNPJ` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnpj` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_CNPJ_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "CNPJ",
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "cnpj" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_cnpj_key" ON "User"("cnpj");
