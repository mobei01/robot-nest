import {
  IsString,
  IsUrl,
  ArrayMinSize,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class wechatArticleDto {
  @IsString()
  title: string;

  @IsOptional()
  description: string;

  @IsUrl()
  url: string;

  @IsOptional()
  picurl: string;
}

export class NewsMessageDto {
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => wechatArticleDto)
  articles: wechatArticleDto[];
}
