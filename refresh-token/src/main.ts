import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AtGuard } from './auth/common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const reflector = new Reflector();
  app.useGlobalGuards(new AtGuard(reflector));
  await app.listen(3000);
}
bootstrap();
