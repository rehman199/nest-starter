import {
  Body,
  Controller,
  Delete,
  Post,
  RawBodyRequest,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { IUser } from 'src/users/user.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

interface IRequestWithUser extends Request {
  user: IUser;
}

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async signUp(
    @Body() body: RawBodyRequest<{ user: Partial<IUser> }>,
    @Res() res: Response,
  ) {
    const userDto = body.user;
    const user = await this.authService.registerNewUser(userDto);
    res.status(201).json({
      message: 'User registered successfully!',
      user: user.withoutPassword(),
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async signIn(@Req() req: IRequestWithUser, @Res() res: Response) {
    const accessToken = await this.authService.loginUser(req.user);

    res.cookie('Authorization', `Bearer ${accessToken}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: parseInt(process.env.COOKIE_MAX_AGE as string),
    });

    res.status(201).send({ message: 'Login Successful!', accessToken });
  }

  @Delete('/logout')
  signOut() {}
}
