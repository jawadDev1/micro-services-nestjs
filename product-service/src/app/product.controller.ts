import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { CreateProductCommand } from './commands/create-product.command';
import { GetProductsQuery } from './queries/get-products.queries';

@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  @Post()
  async create(@Body() body: { name: string }) {
    const product = await this.commandBus.execute(
      new CreateProductCommand(body.name),
    );

    this.kafkaClient.emit('product_created', product);

    return {
      message: 'Command executed successfully',
      data: product,
    };
  }

  @Get()
  async getProducts() {
    return this.queryBus.execute(new GetProductsQuery());
  }
}
