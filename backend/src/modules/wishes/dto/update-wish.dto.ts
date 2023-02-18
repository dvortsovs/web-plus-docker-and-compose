import { IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateWishDto {
  @IsOptional()
  @IsString()
  @Length(1, 250)
  name?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Должно быть ссылкой' })
  link?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Должно быть ссылкой' })
  image?: string;

  @IsOptional()
  @IsString()
  @Length(1, 1024)
  description?: string;

  @IsOptional()
  @IsNumber()
  copied?: number;

  @IsOptional()
  @IsNumber()
  raised?: number;
}
