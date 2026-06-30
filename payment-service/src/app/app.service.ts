import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth() {
    return {
      status: 200,
      message: 'Service is running',
    };
  }
}
