import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserFanbaseService } from "src/userFanbase/userFanbase.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  controllers: [SearchController],
  providers: [SearchService, UserFanbaseService, JwtService],
  imports: [PrismaModule, JwtModule],
})
export class SearchModule {}
