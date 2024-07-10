import { Module } from "@nestjs/common";
import { EmailVerificationService } from "./emailVerification.service";
import {
  EmailVerificationController,
  VerifyEmailController,
} from "./emailVerification.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [EmailVerificationController, VerifyEmailController],
  providers: [EmailVerificationService],
  imports: [PrismaModule],
})
export class EmailVerificationModule {}
