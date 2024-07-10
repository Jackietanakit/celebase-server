import { ApiPropertyOptional } from "@nestjs/swagger";

export class Paymentinfo {
  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional()
  uuid?: string;

  @ApiPropertyOptional()
  eventId?: number;

  @ApiPropertyOptional()
  amount?: number;

  @ApiPropertyOptional()
  slip_image_url?: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
