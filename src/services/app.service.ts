import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  /**
   * testing api is working or not
   *
   * @return : "🚀🚀🚀  Hello World! 🚀 🚀 🚀"
   */
  getHello(): string {
    return '🚀🚀🚀  Hello World! edit 🚀 🚀 🚀 ';
  }
}
