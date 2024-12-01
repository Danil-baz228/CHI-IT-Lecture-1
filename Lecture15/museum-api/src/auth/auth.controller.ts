import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth') 
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register') 
  async register(@Body() body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await this.usersService.create({
      username: body.username,
      password: hashedPassword,
    });
    return user;
  }
  @Post('login') 
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { message: 'Invalid username or password' };
    }
    return this.authService.login(user);
  }
}
