-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "timestamp" DROP DEFAULT,
ALTER COLUMN "timestamp" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "timestamp" DROP DEFAULT,
ALTER COLUMN "timestamp" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "timestamp" DROP DEFAULT,
ALTER COLUMN "timestamp" SET DATA TYPE TEXT;
