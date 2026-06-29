import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: join(process.cwd(), 'lib/proto/auth.proto'),
        url: '127.0.0.1:5005',
      },
    },
  );

  await app.listen();
  Logger.log('Auth micro-service is listening via gRPC...');
}

bootstrap();
