import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const logger = new Logger('Bootstrap');
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get('PORT') || 3000);
  await app.listen(port);
  logger.log(`Server is running on pDDort: ${port}`);
}
bootstrap();
