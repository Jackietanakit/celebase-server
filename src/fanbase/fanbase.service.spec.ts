import { Test, TestingModule } from "@nestjs/testing";
import { FanbaseService } from "./fanbase.service";

describe("FanbaseService", () => {
  let service: FanbaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FanbaseService],
    }).compile();

    service = module.get<FanbaseService>(FanbaseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
