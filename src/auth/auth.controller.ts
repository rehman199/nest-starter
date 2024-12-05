import { Controller, Delete, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signUp() {}

  @Post('login')
  signIn() {}

  @Delete('logout')
  signOut() {}
}
