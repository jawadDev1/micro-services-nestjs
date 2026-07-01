import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateProductCommand } from './create-product.command';

import { writeDb } from '../product.store';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  async execute(command: CreateProductCommand) {
    const product = {
      id: Date.now(),
      name: command.name,
    };

    writeDb.push(product);

    return product;
  }
}
