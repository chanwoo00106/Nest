import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventGateway } from './events.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EventGateway],
})
export class AppModule {}
