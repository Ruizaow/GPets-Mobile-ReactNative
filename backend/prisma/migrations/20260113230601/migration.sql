/*
  Warnings:

  - Made the column `imageUrl` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "isOwner" DROP NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "sex" DROP NOT NULL,
ALTER COLUMN "breed" DROP NOT NULL,
ALTER COLUMN "temper" DROP NOT NULL,
ALTER COLUMN "owner" DROP NOT NULL,
ALTER COLUMN "coordinateLat" DROP NOT NULL,
ALTER COLUMN "coordinateLng" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL;
