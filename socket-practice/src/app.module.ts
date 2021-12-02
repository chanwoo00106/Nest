import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UseModule } from './use/use.module';

@Module({
  imports: [EventsModule, UseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
