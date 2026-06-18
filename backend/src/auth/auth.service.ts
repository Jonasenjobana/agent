import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async checkLogin(data: { email: string; password: string }) {
    const user = await this.userService.login(data.email, data.password);
    if (!user) {
      throw new Error('User not found');
    }             
    if (user.password !== data.password) {
      throw new Error('Password is incorrect');
    }
    const token = await this.jwtService.signAsync({...user, time: Date.now()});
    return token;
  }
}
