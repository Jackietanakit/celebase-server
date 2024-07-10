import { Test, TestingModule } from "@nestjs/testing";
import { DeliveryinfosService } from "./deliveryInfo.service";

describe("DeliveryinfosService", () => {
  let service: DeliveryinfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryinfosService],
    }).compile();

    service = module.get<DeliveryinfosService>(DeliveryinfosService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
