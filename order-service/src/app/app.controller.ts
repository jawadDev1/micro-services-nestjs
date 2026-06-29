import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { type ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

interface AuthService {
  checkUser(data: { userId: string }): Observable<{
    success: boolean;
    message: string;
    data: { id: string; name: string };
  }>;
}

@Controller('order')
export class AppController implements OnModuleInit {
  private authService!: AuthService;

  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService = this.authClient.getService<AuthService>('AuthService');
  }

  @Get(':id')
  async createOrder(@Param('id') userId: string) {
    const result = await lastValueFrom(this.authService.checkUser({ userId }));

    if (result.success) {
      return {
        success: true,
        message: 'Order created successfully!!!!',
        data: {
          id: 1,
          name: 'nothing',
          product_name: 'Nothing watch 3 pro',
        },
      };
    }

    return {
      success: false,
      message: 'Invalid user',
    };
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
