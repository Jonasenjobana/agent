import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('checkUser')
  async checkUser(email: string, password: string) {
    return this.authService.checkLogin({email, password});
  }
}
