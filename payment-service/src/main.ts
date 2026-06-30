import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import Consul from 'consul';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = 3005;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );

  const consul = new Consul({ host: 'consul', port: 8500 });
  // unique service id for each service in consul
  const serviceId = 'payment-service-unique-id-2';
  const registrationDetails = {
    name: 'payment-service',
    address: 'payment-service',
    // address: 'host.docker.internal',
    port,
    id: serviceId,
    check: {
      name: 'payment-service-health',
      // http: `http://host.docker.internal:${port}/api/health`,
      http: 'http://payment-service:3005/api/health',
      interval: '10s',
      timeout: '5s',
    },
  };

  await consul.agent.service.register(registrationDetails);

  // Gracefully close & deregister when Signal Interupts
  process.on('SIGINT', async () => {
    await consul.agent.service.deregister(serviceId);
    await app.close();
    process.exit();
  });
}

bootstrap();
