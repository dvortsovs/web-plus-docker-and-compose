import { IsEmail, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 30)
  username: string;

  @IsString()
  @Length(2, 20)
  password: string;

  @IsString()
  @Length(2, 200)
  about: string;

  @IsUrl({}, { message: 'Должно быть ссылкой' })
  avatar: string;
}
