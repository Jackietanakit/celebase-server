import { PartialType } from "@nestjs/swagger";
import { CreateFanbaseDto } from "./create-fanbase.dto";

export class UpdateFanbaseDto extends PartialType(CreateFanbaseDto) {}
