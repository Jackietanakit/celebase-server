import { Test, TestingModule } from "@nestjs/testing";
import { FanbaseinfoService } from "./fanbaseInfo.service";

describe("FanbaseinfoService", () => {
  let service: FanbaseinfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FanbaseinfoService],
    }).compile();

    service = module.get<FanbaseinfoService>(FanbaseinfoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
