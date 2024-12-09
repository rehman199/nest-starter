import { Controller, Delete, Post, Request, UseGuards } from '@nestjs/common';
import { IUser } from 'src/users/user.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signUp() {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() req: Record<string, IUser>) {
    return this.authService.loginUser(req.user);
  }

  @Delete('logout')
  signOut() {}
}
