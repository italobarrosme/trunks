/*
  Warnings:

  - Added the required column `Date` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "Date" TIMESTAMP(3) NOT NULL;
