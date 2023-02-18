import { Module } from '@nestjs/common';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { WishesModule } from '../wishes/wishes.module';

@Module({
  controllers: [WishlistsController],
  providers: [WishlistsService],
  imports: [TypeOrmModule.forFeature([Wishlist]), WishesModule],
})
export class WishlistsModule {}
