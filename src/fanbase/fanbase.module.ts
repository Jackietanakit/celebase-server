import { Module } from "@nestjs/common";
import { FanbaseService } from "./fanbase.service";
import { FanbaseController } from "./fanbase.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserFanbaseService } from "src/userFanbase/userFanbase.service";
import { UserFanbaseModule } from "src/userFanbase/userFanbase.module";

@Module({
  controllers: [FanbaseController],
  providers: [FanbaseService, UserFanbaseService],
  imports: [PrismaModule, UserFanbaseModule],
})
export class FanbaseModule {}
