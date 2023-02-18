import { Instance } from '../../../entities/instance.entity';
import { Column, Entity, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';
import { IsOptional, IsUrl, Length } from 'class-validator';

@Entity()
export class Wishlist extends Instance {
  @Column()
  @Length(1, 250)
  name: string;

  @Column({ nullable: true })
  @Length(1, 1500)
  @IsOptional()
  description: string;

  @Column()
  @IsUrl({}, { message: 'Должно быть ссылкой' })
  image: string;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
