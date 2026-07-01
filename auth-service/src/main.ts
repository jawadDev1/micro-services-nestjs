import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'auth-consumer',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'auth-group',
        },
        subscribe: {
          fromBeginning: true,
        },
      },
    },
  );

  await app.listen();
  Logger.log('Auth micro-service is listening via KAFKA...');
}

bootstrap();
