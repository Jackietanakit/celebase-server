import { ApiPropertyOptional } from "@nestjs/swagger";
import { UserEventStatus } from "../enum";

export class UserEvent {
  @ApiPropertyOptional()
  uuid?: string;

  @ApiPropertyOptional()
  eventId?: number;

  @ApiPropertyOptional()
  fee?: number;

  @ApiPropertyOptional()
  status?: UserEventStatus;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
