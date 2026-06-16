import { Controller, Get } from '@nestjs/common';
import type { RestfulAPIResponse } from '@agent-project-app/shared';

@Controller('chat')
export class ChatController {
    @Get('')
    getHello(): RestfulAPIResponse<string> {
        return {
            code: 200,
            message: 'success',
            data: 'Hello World!'
        };
    }
}
