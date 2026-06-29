import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('order')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Get(':id')
  async createOrder(@Param('id') userId: string) {
    const pattern = { cmd: 'validate_user' };
    const payload = { userId: Number(userId) };

    const authResp = await firstValueFrom(
      this.authClient.send(pattern, payload),
    );

    if (authResp.status === 'success') {
      return {
        message: 'Order is created successfully',
        status: 'success',
        user: authResp.user,
      };
    }

    return {
      status: 'error',
      message: 'Failed to create Order.',
    };
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
