import { Module } from "@nestjs/common";
import { DeliveryinfosService } from "./deliveryInfo.service";
import { DeliveryinfosController } from "./deliveryInfo.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [DeliveryinfosController],
  providers: [DeliveryinfosService],
  imports: [PrismaModule],
})
export class DeliveryinfoModule {}
