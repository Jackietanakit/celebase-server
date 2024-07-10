import { Module } from "@nestjs/common";
import { EventsService } from "./event.service";
import { EventsController } from "./event.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [PrismaModule],
})
export class EventModule {}
