import { Controller, Get } from '@nestjs/common';
import { VaultService } from './vault.service';
// import { AppService } from './app.service';

@Controller('checkout')
export class AppController {
  constructor(private readonly vaultService: VaultService) {}

  @Get('process')
  async processCheckout() {
    // return await this.appService.discoverAndhandlePayment();
    return {
      status: 'success',
      message: 'Kong is working perfectly!!!!!!!!!!!',
    };
  }

  @Get('db-config')
  handleDBConfig() {
    return {
      message: 'Fetching secrets from hashicorp',
      dbUrl: this.vaultService.getDBUrl(),
    };
  }
}
