import { Controller, Get, Param, Query } from "@nestjs/common";
import { EmailVerificationService } from "./emailVerification.service";
import * as nodemailer from "nodemailer";
import * as smtpTransport from "nodemailer-smtp-transport";
import { generateVerificationCode } from "src/common/utils/email-verification-utils";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Email verification")
@Controller("send-verify-email")
export class EmailVerificationController {
  constructor(
    private readonly EmailVerificationService: EmailVerificationService
  ) {}

  @ApiOperation({ summary: "Send a verification code to the user's email" })
  @Get(":email")
  async sendVerifyEmail(@Param("email") email: string): Promise<string> {
    // Generate a random verification code
    const verificationCode = generateVerificationCode();

    // Create a nodemailer transporter object
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      })
    );

    // Define the email options
    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      to: email,
      subject: "Verification Code",
      text: `Your verification code is ${verificationCode}`,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      this.EmailVerificationService.updateVerificationCode(
        verificationCode,
        email
      );
      return `Verification code has been sent to ${email}`;
    } catch (err) {
      console.error(err);
      return "Failed to send verification code";
    }
  }
}
@ApiTags("Email verification")
@Controller("verify-email")
export class VerifyEmailController {
  constructor(
    private readonly EmailVerificationService: EmailVerificationService
  ) {}

  @ApiOperation({
    summary: "Verify the verification code",
    description:
      "If the code is correct, the api will output {'Verification': true} and then the database will be automatically updated",
  })
  @Get("verification")
  async verifyEmail(
    @Query("email") email: string,
    @Query("code") inputCode: string
  ): Promise<string> {
    // Check if the verification code is correct
    if (await this.EmailVerificationService.verifyEmail(email, inputCode)) {
      this.EmailVerificationService.setVerifiedEmail(email);
      return '{"Verification":true}';
    } else {
      return '{"Verification":false}';
    }
  }
}
