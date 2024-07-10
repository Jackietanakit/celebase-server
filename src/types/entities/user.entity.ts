import { ApiPropertyOptional } from "@nestjs/swagger";
import { User_Role } from "@prisma/client";

export class User {
  @ApiPropertyOptional()
  uuid: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional()
  role: User_Role;

  @ApiPropertyOptional()
  isVerified: boolean;

  @ApiPropertyOptional()
  verificationCode: string;

  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;
}
