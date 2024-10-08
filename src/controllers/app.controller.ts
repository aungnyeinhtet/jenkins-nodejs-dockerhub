import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Testing api is working or not
   *
   * @return : "🚀🚀🚀  Hello World! 🚀 🚀 🚀"
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
