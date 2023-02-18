import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { WishesService } from '../wishes/wishes.service';
import { User } from '../users/entities/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async create(user: User, offerDto: CreateOfferDto) {
    const wish = await this.wishesService.findOne(offerDto.itemId);

    if (!wish)
      throw new HttpException(
        'Такого подарка не существует',
        HttpStatus.NOT_FOUND,
      );
    if (wish.raised + offerDto.amount > wish.price)
      throw new HttpException(
        'Сумма заявки больше, чем осталось собрать',
        HttpStatus.BAD_REQUEST,
      );
    if (user.id === wish.owner.id)
      throw new HttpException(
        'Нельзя скинуться на свой подарок',
        HttpStatus.BAD_REQUEST,
      );

    await this.wishesService.update(wish.id, {
      raised: Number(wish.raised) + Number(offerDto.amount),
    });
    const updateWish = await this.wishesService.findOne(wish.id);
    delete offerDto.itemId;
    return this.offerRepository.save({
      ...offerDto,
      user,
      item: updateWish,
    });
  }

  async findAll() {
    return this.offerRepository.find({
      relations: {
        item: true,
        user: true,
      },
    });
  }

  async findById(id: number) {
    return this.offerRepository.findOne({
      where: { id },
      relations: {
        item: true,
        user: true,
      },
    });
  }
}
