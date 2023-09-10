import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';

@Injectable()
export class UserAuthService {
  private readonly authorization_endpoint = process.env.AUTHORIZATION_ENDPOINT;
  private readonly token_endpoint = process.env.TOKEN_ENDPOINT;
  private readonly profile_endpoint = process.env.PROFILE_ENDPOINT;
  private readonly scope = process.env.SCOPE;
  private readonly client_id = process.env.CHANNEL_ID;
  private readonly client_secret = process.env.CHANNEL_SECRET;
  private readonly redirect_uri = process.env.CALLBACK_URL;

  constructor(
    private readonly httpService: HttpService,
  ) {}

  login() {
    const state = randomBytes(16).toString('hex');
    const nonce = uuidv4();
    const authorizeUrl = `${this.authorization_endpoint}?response_type=code&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&scope=${this.scope}&state=${state}&nonce=${nonce}`;
    return authorizeUrl;
  }

  async authorize(
    authorizationCode,
  ): Promise<any> {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const form = {
        grant_type: 'authorization_code',
        code: authorizationCode.code,
        redirect_uri: this.redirect_uri,
        client_id: this.client_id,
        client_secret: this.client_secret
    };

    console.log(this.token_endpoint, form, headers)
    const response = await lastValueFrom(
      this.httpService.post(this.token_endpoint, form, { headers })
    );
    return response;
  }

  async getUserProfile(
    tokenData
    ): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(this.profile_endpoint, {
        headers: {
          Authorization: `Bearer ${tokenData.data.access_token}`,
        },
      }))      
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile: ${tokenData}');
    }
  }

}