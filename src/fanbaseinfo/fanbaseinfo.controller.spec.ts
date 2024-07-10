import { Test, TestingModule } from "@nestjs/testing";
import { FanbaseinfoController } from "./fanbaseInfo.controller";
import { FanbaseinfoService } from "./fanbaseInfo.service";

describe("FanbaseinfoController", () => {
  let controller: FanbaseinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FanbaseinfoController],
      providers: [FanbaseinfoService],
    }).compile();

    controller = module.get<FanbaseinfoController>(FanbaseinfoController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
