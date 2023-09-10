import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserAuthController } from './user_auth.controller';
import { UserAuthService } from './user_auth.service';

@Module({
    imports: [
      HttpModule,
    ],
    controllers: [UserAuthController],
    providers: [UserAuthService],
  })
export default class UserAuthModule {}
