import { ApiPropertyOptional } from "@nestjs/swagger";

export class fanbaseInfo {
  @ApiPropertyOptional()
  fanbase_id: number;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  artist_name: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  img_url?: string;

  @ApiPropertyOptional()
  cover_img_url?: string;

  @ApiPropertyOptional()
  twitter_url?: string;

  @ApiPropertyOptional()
  facebook_url?: string;

  @ApiPropertyOptional()
  instagram_url?: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
