import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFanbaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fbusername: string;

  @ApiProperty()
  isVerified: boolean;
}
