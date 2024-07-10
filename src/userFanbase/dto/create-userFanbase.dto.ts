import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { User_Fanbase_Role, Prisma } from "@prisma/client";
export class CreateUserFanbaseDto {
  @ApiProperty()
  @IsNotEmpty()
  User: Prisma.UserCreateNestedOneWithoutUser_FanbaseInput;

  @ApiProperty()
  @IsNotEmpty()
  Fanbase: Prisma.FanbaseCreateNestedOneWithoutUser_FanbaseInput;

  @ApiProperty({ default: User_Fanbase_Role.FOLLOWER })
  @IsOptional()
  role?: User_Fanbase_Role;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date;
}
