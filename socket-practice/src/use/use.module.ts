import { Module } from '@nestjs/common';
import { UseService } from './use.service';
import { UseController } from './use.controller';
import { EventsGateway } from '../events/events.gateway';

@Module({
  providers: [UseService, EventsGateway],
  controllers: [UseController],
})
export class UseModule {}
