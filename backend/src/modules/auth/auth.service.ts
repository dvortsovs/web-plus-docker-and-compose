import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  auth(user: User) {
    const payload = { id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) return null;
    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword) {
      delete user.password;
      return user;
    }
    return null;
  }
}
