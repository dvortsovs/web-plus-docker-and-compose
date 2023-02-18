import { Column, Entity, OneToMany } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Instance } from '../../../entities/instance.entity';
import { IsEmail, IsUrl, Length } from 'class-validator';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends Instance {
  @Column({ unique: true })
  @Length(2, 30)
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl({}, { message: 'Должно быть ссылкой' })
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Exclude()
  @Column()
  @Length(2, 20)
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
