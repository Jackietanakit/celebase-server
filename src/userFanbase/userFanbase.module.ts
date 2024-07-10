import { Module } from "@nestjs/common";
import { UserFanbaseService } from "./userFanbase.service";
import { UserFanbaseController } from "./userFanbase.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [UserFanbaseController],
  providers: [UserFanbaseService],
  imports: [PrismaModule],
})
export class UserFanbaseModule {}
