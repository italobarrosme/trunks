/*
  Warnings:

  - The values [RENT,MORTGAGE,INVESTMENT] on the enum `TransactionCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionCategory_new" AS ENUM ('HOUSING', 'FOOD', 'TRANSPORT', 'SHOPPING', 'ENTERTAINMENT', 'UTILITY', 'SALARY', 'INSURANCE', 'TAXES', 'HEALTH', 'EDUCATION', 'OTHER');
ALTER TABLE "Transaction" ALTER COLUMN "category" TYPE "TransactionCategory_new" USING ("category"::text::"TransactionCategory_new");
ALTER TYPE "TransactionCategory" RENAME TO "TransactionCategory_old";
ALTER TYPE "TransactionCategory_new" RENAME TO "TransactionCategory";
DROP TYPE "TransactionCategory_old";
COMMIT;

-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'RECURRING_EXPENSE';

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "installment" INTEGER,
ADD COLUMN     "totalInstallments" INTEGER;
