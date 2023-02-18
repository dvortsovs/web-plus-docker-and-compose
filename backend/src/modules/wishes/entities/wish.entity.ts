import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Instance } from '../../../entities/instance.entity';
import { IsNumber, IsOptional, IsUrl, Length } from 'class-validator';

@Entity()
export class Wish extends Instance {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl({}, { message: 'Должно быть ссылкой' })
  link: string;

  @Column()
  @IsUrl({}, { message: 'Должно быть ссылкой' })
  image: string;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column({
    scale: 2,
  })
  @IsNumber()
  price: number;

  @Column({ default: 0 })
  @IsOptional()
  copied: number;

  @Column({ default: 0, scale: 2 })
  @IsOptional()
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
}
