/*
  Warnings:

  - You are about to drop the column `itemName` on the `Delivery_Info` table. All the data in the column will be lost.
  - You are about to drop the column `trackingNo` on the `Delivery_Info` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tracking_no]` on the table `Delivery_Info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `item_name` to the `Delivery_Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tracking_no` to the `Delivery_Info` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Delivery_Info_trackingNo_key";

-- AlterTable
ALTER TABLE "Delivery_Info" DROP COLUMN "itemName",
DROP COLUMN "trackingNo",
ADD COLUMN     "item_name" TEXT NOT NULL,
ADD COLUMN     "tracking_no" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_Info_tracking_no_key" ON "Delivery_Info"("tracking_no");
