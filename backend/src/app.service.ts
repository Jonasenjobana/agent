import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type { RestfulAPIResponse } from '@agent-project-app/shared';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
}
