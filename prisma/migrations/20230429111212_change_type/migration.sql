/*
  Warnings:

  - You are about to alter the column `fee` on the `User_Event` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "User_Event" ALTER COLUMN "fee" SET DATA TYPE DOUBLE PRECISION;
