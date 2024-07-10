import { ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "../enum";

export class userInfo {
  @ApiPropertyOptional()
  user_uuid: string;

  @ApiPropertyOptional()
  username: string;

  @ApiPropertyOptional()
  display_name?: string;

  @ApiPropertyOptional()
  first_name?: string;

  @ApiPropertyOptional()
  last_name?: string;

  @ApiPropertyOptional()
  gender?: Gender;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  img_url?: string;

  @ApiPropertyOptional()
  cover_img_url?: string;

  @ApiPropertyOptional()
  national_id_img_url?: string;

  @ApiPropertyOptional()
  identity_img_url?: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
