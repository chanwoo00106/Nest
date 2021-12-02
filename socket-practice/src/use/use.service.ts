import { Injectable } from '@nestjs/common';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class UseService {
  constructor(private eventsGateway: EventsGateway) {}

  send() {
    this.eventsGateway.server.emit('message', 'hello');
  }
}
