import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService],
  imports: [PrismaModule, JwtModule],
})
export class UserModule {}
