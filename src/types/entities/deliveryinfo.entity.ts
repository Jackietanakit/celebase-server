import { ApiPropertyOptional } from "@nestjs/swagger";
import { Delivery_Type } from "@prisma/client";

export class DeliveryInfo {
  @ApiPropertyOptional()
  tracking_no: string;

  @ApiPropertyOptional()
  item_name: string;

  @ApiPropertyOptional()
  uuid: string;

  @ApiPropertyOptional()
  event_id: number;

  @ApiPropertyOptional()
  delivery_type: Delivery_Type;

  @ApiPropertyOptional()
  date_sent?: Date;

  @ApiPropertyOptional()
  date_received?: Date;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
