import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.login(createUserDto.email, createUserDto.password);
    if (!user) {
      return {
        message: 'User not found',
      }
    }
    return {
      message: 'Login success',
      user: {
        name: user.name,
        email: user.email,
      }
    };
  }
}
