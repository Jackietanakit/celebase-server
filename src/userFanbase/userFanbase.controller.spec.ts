import { Test, TestingModule } from "@nestjs/testing";
import { UserFanbaseController } from "./userFanbase.controller";
import { UserFanbaseService } from "./userFanbase.service";

describe("UserFanbaseController", () => {
  let controller: UserFanbaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFanbaseController],
      providers: [UserFanbaseService],
    }).compile();

    controller = module.get<UserFanbaseController>(UserFanbaseController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
