import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Prisma, User_Event_Status } from "@prisma/client";

export class CreateUserEventDto {
  @ApiProperty()
  @IsOptional()
  fee?: number;

  @ApiProperty()
  @IsOptional()
  status?: User_Event_Status;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty()
  @IsNotEmpty()
  User: Prisma.UserCreateNestedOneWithoutUser_EventInput;

  @ApiProperty()
  @IsNotEmpty()
  Event: Prisma.EventCreateNestedOneWithoutUser_EventInput;
}
