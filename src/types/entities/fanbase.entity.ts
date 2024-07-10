import { ApiPropertyOptional } from "@nestjs/swagger";

export class Fanbase {
  @ApiPropertyOptional()
  fbusername: string;

  @ApiPropertyOptional()
  isVerified: boolean;
}
