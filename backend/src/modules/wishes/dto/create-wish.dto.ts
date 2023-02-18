import { IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl({}, { message: 'Должно быть ссылкой' })
  link: string;

  @IsUrl({}, { message: 'Должно быть ссылкой' })
  image: string;

  @IsNumber()
  price: number;

  @IsString()
  @Length(1, 1024)
  description: string;
}
