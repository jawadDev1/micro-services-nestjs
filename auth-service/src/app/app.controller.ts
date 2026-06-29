import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'validate_user' })
  handleUserValidation(@Payload() data: { userId: number }) {
    console.log('Auth Service received data :: ', data);
    if (data.userId === 1) {
      return { status: 'success', user: { id: 1, name: 'Monkey D. Luffy' } };
    }

    return {
      status: 'error',
      message: 'User not found!!!!.',
    };
  }
}
