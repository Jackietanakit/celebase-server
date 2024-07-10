import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsDateString } from "class-validator";
import { Event_Status, Event_Type, Prisma } from "@prisma/client";

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  start?: Date;

  @ApiProperty()
  @IsOptional()
  end?: Date;

  @ApiProperty()
  @IsOptional()
  location?: string | null;

  @ApiProperty()
  @IsOptional()
  description?: string | null;

  @ApiProperty()
  @IsOptional()
  img_url?: string | null;

  @ApiProperty()
  @IsOptional()
  cover_img_url?: string | null;

  @ApiProperty()
  @IsOptional()
  status?: Event_Status;

  @ApiProperty()
  @IsOptional()
  type?: Event_Type;

  @ApiProperty()
  @IsOptional()
  max_capacity?: number | null;

  @ApiProperty({ default: 0 })
  @IsOptional()
  max_fee?: number | string | null;

  @ApiProperty({ default: new Date() })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ default: new Date() })
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty()
  @IsNotEmpty()
  Fanbase: Prisma.FanbaseCreateNestedOneWithoutEventInput;

  @ApiProperty()
  @IsOptional()
  User_Event?: Prisma.User_EventCreateNestedManyWithoutEventInput;

  @ApiProperty()
  @IsNotEmpty()
  Payment_Info?: Prisma.Payment_InfoCreateNestedManyWithoutEventInput;
}
