import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtGuard } from '../../guards/jwt.guard';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() offerDto: CreateOfferDto, @Req() req) {
    return this.offersService.create(req.user, offerDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.offersService.findById(Number(id));
  }
}
