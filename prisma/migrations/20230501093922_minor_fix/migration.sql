-- DropForeignKey
ALTER TABLE "Fanbase_Info" DROP CONSTRAINT "Fanbase_Info_fanbase_id_fkey";

-- AddForeignKey
ALTER TABLE "Fanbase_Info" ADD CONSTRAINT "Fanbase_Info_fanbase_id_fkey" FOREIGN KEY ("fanbase_id") REFERENCES "Fanbase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
