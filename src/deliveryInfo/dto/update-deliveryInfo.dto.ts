import { PartialType } from "@nestjs/mapped-types";
import { CreateDeliveryinfoDto } from "./create-deliveryInfo.dto";

export class UpdateDeliveryinfoDto extends PartialType(CreateDeliveryinfoDto) {}
