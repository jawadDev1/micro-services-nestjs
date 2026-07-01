import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('session_updated')
  handleUserSession(@Payload() data: { name: string }) {
    console.log('Event Recieved', data);
  }
}
