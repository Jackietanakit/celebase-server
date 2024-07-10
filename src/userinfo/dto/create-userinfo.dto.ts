import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { Gender, Prisma } from "@prisma/client";

export class CreateUserinfoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  display_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({ default: "PREFER_NOT_TO_SAY" })
  gender: Gender;

  @ApiProperty()
  @IsOptional()
  address?: string | null;

  @ApiProperty()
  @IsOptional()
  img_url?: string | null;

  @ApiProperty()
  @IsOptional()
  cover_img_url?: string | null;

  @ApiProperty()
  @IsOptional()
  national_id_img_url?: string | null;

  @ApiProperty()
  @IsOptional()
  identity_img_url?: string | null;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  @IsNotEmpty()
  User: Prisma.UserCreateNestedOneWithoutUser_InfoInput;
}
