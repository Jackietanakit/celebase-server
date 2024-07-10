import { PartialType } from "@nestjs/mapped-types";
import { CreateUserFanbaseDto } from "./create-userFanbase.dto";

export class UpdateUserFanbaseDto extends PartialType(CreateUserFanbaseDto) {}
