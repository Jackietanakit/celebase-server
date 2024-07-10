import { Module } from "@nestjs/common";
import { FanbaseinfoService } from "./fanbaseInfo.service";
import { FanbaseinfoController } from "./fanbaseinfo.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [FanbaseinfoController],
  providers: [FanbaseinfoService],
  imports: [PrismaModule],
})
export class FanbaseinfoModule {}
