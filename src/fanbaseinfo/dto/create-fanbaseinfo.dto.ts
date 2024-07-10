import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsEmail } from "class-validator";
import { Prisma } from "@prisma/client";

export class CreateFanbaseinfoDto {
  @ApiProperty()
  @IsNotEmpty()
  Fanbase: Prisma.FanbaseCreateNestedOneWithoutUser_FanbaseInput;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  artist_name: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @ApiProperty()
  @IsOptional()
  address?: string | null;

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
  twitter_url?: string | null;

  @ApiProperty()
  @IsOptional()
  facebook_url?: string | null;

  @ApiProperty()
  @IsOptional()
  instagram_url?: string | null;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
