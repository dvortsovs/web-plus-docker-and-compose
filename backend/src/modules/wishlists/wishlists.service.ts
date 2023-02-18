import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { In, Repository } from 'typeorm';
import { WishesService } from '../wishes/wishes.service';
import { User } from '../users/entities/user.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
  ) {}

  async create(owner: User, createWishlistDto: CreateWishlistDto) {
    const items = await this.wishesService.findMany({
      where: { id: In(createWishlistDto.itemsId) },
    });
    delete createWishlistDto.itemsId;
    return this.wishlistsRepository.save({
      ...createWishlistDto,
      owner,
      items,
    });
  }

  async findAll() {
    return this.wishlistsRepository.find({
      relations: {
        items: true,
        owner: true,
      },
    });
  }

  async findOne(id: number) {
    return this.wishlistsRepository.findOne({
      relations: {
        items: true,
        owner: true,
      },
      where: { id },
    });
  }

  async update(id: number, createWishlistDto: CreateWishlistDto) {
    const items = await this.wishesService.findMany({
      where: { id: In(createWishlistDto.itemsId) },
    });
    delete createWishlistDto.itemsId;
    return this.wishlistsRepository.update(
      { id },
      {
        items,
        ...createWishlistDto,
      },
    );
  }

  async delete(id: number) {
    return this.wishlistsRepository.delete({ id });
  }
}
