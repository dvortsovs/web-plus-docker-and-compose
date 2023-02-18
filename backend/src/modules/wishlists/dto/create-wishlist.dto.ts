import { IsArray, IsString, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @Length(1, 1500)
  description: string;

  @IsUrl({}, { message: 'Должно быть ссылкой' })
  image: string;

  @IsArray()
  itemsId: number[];
}
