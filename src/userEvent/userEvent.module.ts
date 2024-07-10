import { Module } from "@nestjs/common";
import { UserEventService } from "./userEvent.service";
import { UserEventController } from "./userEvent.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [UserEventController],
  providers: [UserEventService],
  imports: [PrismaModule],
})
export class UserEventModule {}
