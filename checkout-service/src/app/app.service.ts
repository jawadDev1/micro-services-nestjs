import { Injectable } from '@nestjs/common';
import Consul from 'consul';

@Injectable()
export class AppService {
  private consul = new Consul({ host: 'consul', port: 8500 });

  async discoverAndhandlePayment() {
    const services = await this.consul.agent.service.list();
    const paymentInfo = services['payment-service-unique-id-2'];
    if (!paymentInfo) {
      throw new Error('Payment service not found');
    }

    const address = 'payment-service';
    const port = paymentInfo.Port;
    const finalUrl = `http://${address}:${port}/api/health`;
    console.log(`Discovery Successful !!!!!!!!! Calling ${finalUrl}`);

    return {
      message: 'Service discovered',
      discoveredUrl: finalUrl,
      serviceData: paymentInfo,
    };
  }
}
