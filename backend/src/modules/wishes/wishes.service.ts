import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { User } from '../users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async remove(id: number) {
    return await this.wishRepository.delete({ id });
  }

  async update(id: number, wishDto: UpdateWishDto) {
    return await this.wishRepository.update(
      { id },
      { ...wishDto, updatedAt: new Date() },
    );
  }

  async findOne(id: number) {
    return await this.wishRepository.findOne({
      relations: {
        owner: { wishes: true, wishlists: true, offers: true },
        offers: { user: true },
      },
      where: { id },
    });
  }

  async findTop() {
    return await this.wishRepository.find({
      relations: {
        owner: { wishes: true, wishlists: true, offers: true },
        offers: { user: true },
      },
      take: 10,
      order: { copied: 'DESC' },
    });
  }

  async findLast() {
    return await this.wishRepository.find({
      relations: {
        owner: { wishes: true, wishlists: true, offers: true },
        offers: { user: true },
      },
      take: 40,
      order: { createdAt: 'DESC' },
    });
  }

  async findAll() {
    return await this.wishRepository.find();
  }

  async findUserWishes(id: number) {
    return await this.wishRepository.find({
      where: { owner: { id } },
    });
  }

  async create(owner: User, wishDto: CreateWishDto) {
    return await this.wishRepository.save({
      ...wishDto,
      owner,
    });
  }

  async findMany(ids: FindManyOptions<Wish>) {
    return this.wishRepository.find(ids);
  }
}
