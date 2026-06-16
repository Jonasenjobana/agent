import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type { RestfulAPIResponse } from '@agent-project-app/shared';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async getHello(): Promise<RestfulAPIResponse<string>> {
    try {
      const res = await this.httpService.get('http://localhost:3030/chat').toPromise();
      return res?.data as RestfulAPIResponse<string>;
    } catch (error) {
      return {
        code: 500,
        message: 'error',
        data: error.message
      };
    }
  }
}
