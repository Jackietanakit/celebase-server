import { Test, TestingModule } from "@nestjs/testing";
import { EmailVerificationController } from "./emailVerification.controller";
import { EmailVerificationService } from "./emailVerification.service";

describe("EmailVerificationController", () => {
  let controller: EmailVerificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailVerificationController],
      providers: [EmailVerificationService],
    }).compile();

    controller = module.get<EmailVerificationController>(
      EmailVerificationController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
