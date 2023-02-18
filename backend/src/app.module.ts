import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { WishesModule } from './modules/wishes/wishes.module';
import { WishlistsModule } from './modules/wishlists/wishlists.module';
import { OffersModule } from './modules/offers/offers.module';
import { Wish } from './modules/wishes/entities/wish.entity';
import { Offer } from './modules/offers/entities/offer.entity';
import { Wishlist } from './modules/wishlists/entities/wishlist.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './configurations/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_pass'),
        database: configService.get('db_name'),
        synchronize: true,
        entities: [User, Wish, Offer, Wishlist],
      }),
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
