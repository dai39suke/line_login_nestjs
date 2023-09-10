import { Controller, Get, Query, Res, Render, Session } from '@nestjs/common';
import { UserAuthService } from './user_auth.service';
import { FastifyReply } from 'fastify';

@Controller('/auth')
export class UserAuthController {
  constructor(private readonly authService: UserAuthService) {}

  @Get('/login')
  async login(@Res() response: FastifyReply) {
    try{
      const authorizeUrl = this.authService.login();
      console.log(authorizeUrl)
      response.redirect(302, authorizeUrl);
    } catch(error){
      console.log(error)
    }
  }

  @Get('/callback')
  @Render('result')
  async callback(
    @Query() query: any,
    @Res() response: FastifyReply
  ) {

    const authorizeRequest = {
      code: query.code,
      state: query.state,
    };

    console.log('Authorization Request Code:', authorizeRequest.code)
    console.log('Response Status', response.status);
    const tokenData = await this.authService.authorize(authorizeRequest);
    console.log('Token Data: ', tokenData);
    const userProfile = await this.authService.getUserProfile(tokenData)
    console.log('User Profile: ', userProfile);
    return {tokenData, userProfile}
  }

}