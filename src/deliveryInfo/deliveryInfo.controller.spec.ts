import { Test, TestingModule } from "@nestjs/testing";
import { DeliveryinfosController } from "./deliveryInfo.controller";
import { DeliveryinfosService } from "./deliveryInfo.service";

describe("DeliveryinfosController", () => {
  let controller: DeliveryinfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryinfosController],
      providers: [DeliveryinfosService],
    }).compile();

    controller = module.get<DeliveryinfosController>(DeliveryinfosController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
