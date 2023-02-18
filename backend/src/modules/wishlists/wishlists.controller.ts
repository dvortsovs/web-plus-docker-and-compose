import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtGuard } from '../../guards/jwt.guard';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(req.user, createWishlistDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.wishlistsService.findOne(Number(id));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    return this.wishlistsService.update(Number(id), createWishlistDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistsService.delete(Number(id));
  }
}
