import { Test, TestingModule } from "@nestjs/testing";
import { FanbaseController } from "./fanbase.controller";
import { FanbaseService } from "./fanbase.service";

describe("FanbaseController", () => {
  let controller: FanbaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FanbaseController],
      providers: [FanbaseService],
    }).compile();

    controller = module.get<FanbaseController>(FanbaseController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
