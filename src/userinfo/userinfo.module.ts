import { Module } from "@nestjs/common";
import { UserinfoService } from "./userinfo.service";
import { UserinfoController } from "./userinfo.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [UserinfoController],
  providers: [UserinfoService],
  imports: [PrismaModule],
})
export class UserinfoModule {}
