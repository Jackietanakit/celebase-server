import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import { Delivery_Type, Prisma } from "@prisma/client";
export class CreateDeliveryinfoDto {
  @ApiProperty()
  @IsNotEmpty()
  tracking_no: string;

  @ApiProperty()
  @IsNotEmpty()
  item_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date_sent: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date_received: Date;

  @ApiProperty()
  @IsNotEmpty()
  delivery_type: Delivery_Type;

  @ApiProperty()
  @IsNotEmpty()
  User: Prisma.UserCreateNestedOneWithoutDelivery_InfoInput;

  @ApiProperty()
  @IsNotEmpty()
  Event: Prisma.EventCreateNestedOneWithoutDelivery_InfoInput;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date;
}
