import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from '../../guards/jwt.guard';
import * as bcrypt from 'bcrypt';
import { SearchUserDto } from './dto/search-user.dto';
import { WishesService } from '../wishes/wishes.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private wishesService: WishesService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Get('/me')
  getProfile(@Req() req) {
    return this.userService.getUserById(req.user.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Patch('/me')
  async updateProfile(@Req() req, @Body() updateUser: CreateUserDto) {
    const user = { ...req.user, ...updateUser };
    const hash = updateUser.password
      ? await bcrypt.hash(updateUser.password, 10)
      : user.password;
    await this.userService.update(req.user.id, {
      ...user,
      password: hash,
    });
    return this.userService.getUserById(req.user.id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Post('/find')
  findMany(@Body() searchUser: SearchUserDto) {
    return this.userService.findMany(searchUser);
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  findMyWishes(@Req() req) {
    return this.wishesService.findUserWishes(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);
    delete user.email;
    delete user.password;
    return user;
  }

  @UseGuards(JwtGuard)
  @Get(':username/wishes')
  async findUserWishes(@Param('username') username) {
    const { id } = await this.userService.getUserByUsername(username);
    return this.wishesService.findUserWishes(id);
  }
}
