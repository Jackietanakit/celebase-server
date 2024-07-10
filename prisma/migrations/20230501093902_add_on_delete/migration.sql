-- DropForeignKey
ALTER TABLE "Delivery_Info" DROP CONSTRAINT "Delivery_Info_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Delivery_Info" DROP CONSTRAINT "Delivery_Info_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_fanbase_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment_Info" DROP CONSTRAINT "Payment_Info_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment_Info" DROP CONSTRAINT "Payment_Info_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "User_Event" DROP CONSTRAINT "User_Event_event_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Event" DROP CONSTRAINT "User_Event_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "User_Fanbase" DROP CONSTRAINT "User_Fanbase_fanbase_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Fanbase" DROP CONSTRAINT "User_Fanbase_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "User_Info" DROP CONSTRAINT "User_Info_user_uuid_fkey";

-- AddForeignKey
ALTER TABLE "User_Info" ADD CONSTRAINT "User_Info_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_fanbase_id_fkey" FOREIGN KEY ("fanbase_id") REFERENCES "Fanbase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Fanbase" ADD CONSTRAINT "User_Fanbase_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Fanbase" ADD CONSTRAINT "User_Fanbase_fanbase_id_fkey" FOREIGN KEY ("fanbase_id") REFERENCES "Fanbase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Event" ADD CONSTRAINT "User_Event_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Event" ADD CONSTRAINT "User_Event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment_Info" ADD CONSTRAINT "Payment_Info_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment_Info" ADD CONSTRAINT "Payment_Info_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery_Info" ADD CONSTRAINT "Delivery_Info_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery_Info" ADD CONSTRAINT "Delivery_Info_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
