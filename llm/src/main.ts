import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
const logger = new Logger('Bootstrap');
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = Number(process.env.PORT || 3000);
  await app.listen(port);
  logger.log(`Server is running on port: ${port}`);
}
bootstrap();
