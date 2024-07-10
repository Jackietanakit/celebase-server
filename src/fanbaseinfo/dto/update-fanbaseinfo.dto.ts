import { PartialType } from "@nestjs/swagger";
import { CreateFanbaseinfoDto } from "./create-fanbaseinfo.dto";

export class UpdateFanbaseinfoDto extends PartialType(CreateFanbaseinfoDto) {}
