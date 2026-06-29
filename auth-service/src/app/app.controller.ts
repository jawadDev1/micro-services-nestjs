import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  GrpcMethod,
  GrpcService,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AuthService', 'CheckUser')
  checkUser(data: { userId: string }) {
    if (data.userId === 'abc') {
      return {
        success: true,
        message: 'User found successfully',
        data: { id: 1, name: 'Monkey D. Luffy' },
      };
    }

    return {
      success: false,
      message: 'User not found',
      data: null,
    };
  }
}
