/*
  Warnings:

  - You are about to drop the column `fanbase_id` on the `Delivery_Info` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Payment_Info` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - A unique constraint covering the columns `[trackingNo]` on the table `Delivery_Info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `event_id` to the `Delivery_Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemName` to the `Delivery_Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackingNo` to the `Delivery_Info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Event_Type" ADD VALUE 'DELIVERY';

-- DropForeignKey
ALTER TABLE "Delivery_Info" DROP CONSTRAINT "Delivery_Info_fanbase_id_fkey";

-- AlterTable
ALTER TABLE "Delivery_Info" DROP COLUMN "fanbase_id",
ADD COLUMN     "event_id" INTEGER NOT NULL,
ADD COLUMN     "itemName" TEXT NOT NULL,
ADD COLUMN     "trackingNo" TEXT NOT NULL,
ALTER COLUMN "date_sent" DROP NOT NULL,
ALTER COLUMN "date_received" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "all_time" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "start" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment_Info" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_Info_trackingNo_key" ON "Delivery_Info"("trackingNo");

-- AddForeignKey
ALTER TABLE "Delivery_Info" ADD CONSTRAINT "Delivery_Info_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
