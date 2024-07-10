import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { User_Role } from "@prisma/client";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: User_Role;

  @ApiProperty({ default: false })
  isVerified: boolean;

  @ApiProperty()
  @IsString()
  verificationCode: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
