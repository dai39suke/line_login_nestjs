import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // GET /public
  @Render('index') 
  async getHomePage() {
    return { message: 'Hello World!' };
  }
}
