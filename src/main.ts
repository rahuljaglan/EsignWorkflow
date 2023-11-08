import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });
  await app.listen(3000);
}
bootstrap();
