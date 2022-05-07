import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
