import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World! \nFrom Nest Starter APP!';
  }
}
