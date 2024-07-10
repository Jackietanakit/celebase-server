/*
  Warnings:

  - Added the required column `delivery_type` to the `Delivery_Info` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Delivery_Type" AS ENUM ('EMS', 'KERRY', 'FLASH', 'NINJA', 'GRAB', 'LINEMAN', 'OTHER');

-- AlterTable
ALTER TABLE "Delivery_Info" ADD COLUMN     "delivery_type" "Delivery_Type" NOT NULL;

-- AlterTable
ALTER TABLE "Fanbase" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
