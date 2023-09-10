import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import UserAuthModule from './user_auth/user_auth.module'; // modules under user_auth directory

@Module({
  imports: [
    UserAuthModule,
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ) // .env file that read from project root directory
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
