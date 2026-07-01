import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { readDb } from './product.store';

@Controller()
export class ProductConsumer {
  @EventPattern('product_created')
  handleProductCreated(@Payload() data: { name: string }) {
    readDb.push(data);
  }
}
