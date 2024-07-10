import { ApiPropertyOptional } from "@nestjs/swagger";
import { EventStatus, EventType } from "../enum";
export class Event {
  @ApiPropertyOptional()
  fanbaseId: number;

  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  start?: Date;

  @ApiPropertyOptional()
  end?: Date;

  @ApiPropertyOptional()
  location?: string;

  @ApiPropertyOptional()
  img_url?: string;

  @ApiPropertyOptional()
  cover_img_url?: string;

  @ApiPropertyOptional()
  status?: EventStatus;

  @ApiPropertyOptional()
  type?: EventType;

  @ApiPropertyOptional()
  max_capacity?: number;

  @ApiPropertyOptional()
  max_fee?: number;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
