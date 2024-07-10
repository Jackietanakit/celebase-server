import { Test, TestingModule } from "@nestjs/testing";
import { UserFanbaseService } from "./userFanbase.service";

describe("UserFanbaseService", () => {
  let service: UserFanbaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFanbaseService],
    }).compile();

    service = module.get<UserFanbaseService>(UserFanbaseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
