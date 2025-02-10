import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('Hello World!');
    return this.appService.getHello();
  }

  @Post()
  @HttpCode(201)
  createUser(@Req() request: Request, @Body('task') body: string) {
    console.log(body, 'Request Body');
    return this.appService.newMethod(body);
  }
}
