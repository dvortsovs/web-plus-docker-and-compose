import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtGuard } from '../../guards/jwt.guard';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Post()
  createWish(@Body() wishDto: CreateWishDto, @Req() req) {
    return this.wishesService.create(req.user, wishDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/last')
  findLastWishes() {
    return this.wishesService.findLast();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/top')
  findTopWishes() {
    return this.wishesService.findTop();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findWish(@Param('id') id: number) {
    return this.wishesService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateWish(
    @Param('id') id: number,
    @Body() wishDto: UpdateWishDto,
    @Req() req,
  ) {
    const wish = await this.wishesService.findOne(id);
    if (wish.owner.id === req.user.id) {
      await this.wishesService.update(id, wishDto);
      return this.wishesService.findOne(id);
    }
    throw new HttpException(
      'Нельзя изменять чужие подарки',
      HttpStatus.FORBIDDEN,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteWish(@Param('id') id: number, @Req() req) {
    const wish = await this.wishesService.findOne(id);
    if (wish.owner.id === req.user.id) {
      return this.wishesService.remove(id);
    }
    throw new HttpException(
      'Нельзя удалять чужие подарки',
      HttpStatus.FORBIDDEN,
    );
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copyWish(@Param('id') id: number, @Req() req) {
    const wish = await this.wishesService.findOne(id);
    await this.wishesService.update(wish.id, { copied: wish.copied + 1 });
    const { name, price, description, link, image } = wish;
    return this.wishesService.create(req.user, {
      name,
      link,
      image,
      price,
      description,
    });
  }
}
