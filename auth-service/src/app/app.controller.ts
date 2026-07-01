import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.authClient.connect();
  }

  @EventPattern('session_updated')
  handleUserSession(@Payload() data: { name: string }) {
    try {
      console.log('Event Recieved', data);

      throw new Error('Session Update failed');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.authClient.emit('failed_session_update_dlq', msg);

      return {
        success: false,
        message: msg,
      };
    }
  }

  @EventPattern('failed_session_update_dlq')
  handleFailedSessionUpdate(@Payload() msg: string) {
    console.log('Received failed message :: ', msg);
  }
}
