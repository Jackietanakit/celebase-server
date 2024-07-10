import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EmailVerificationService {
  constructor(private readonly prisma: PrismaService) {}
  async updateVerificationCode(
    verificationCode: string,
    email: string
  ): Promise<void> {
    await this.prisma.user.update({
      where: { email: email },
      data: { verificationCode: verificationCode },
    });
  }
  async setVerifiedEmail(email: string): Promise<void> {
    await this.prisma.user.update({
      where: { email: email },
      data: { isVerified: true },
    });
  }
  async verifyEmail(email: string, inputCode: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    return inputCode === user.verificationCode;
  }
}
