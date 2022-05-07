import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AtGuard } from './auth/guards/at.guard';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://gdrive.o-r.kr',
        'https://gdrive.o-r.kr',
        'http://localhost:3000',
      ],
      credentials: true,
    },
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AtGuard(new Reflector()));

  await app.listen(8000);
}
bootstrap();
