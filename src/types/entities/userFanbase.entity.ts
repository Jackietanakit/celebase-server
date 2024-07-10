import { ApiPropertyOptional } from "@nestjs/swagger";
import { UserFanbaseRole } from "../enum";

export class UserFanbase {
  @ApiPropertyOptional()
  uuid?: string;

  @ApiPropertyOptional()
  fanbaseId?: number;

  @ApiPropertyOptional()
  role?: UserFanbaseRole;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
