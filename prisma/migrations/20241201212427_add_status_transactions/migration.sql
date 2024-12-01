-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PAID', 'CANCELED', 'OVERDUE');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
