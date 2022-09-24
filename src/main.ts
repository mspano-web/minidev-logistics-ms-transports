import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

/* ----------------------------------------- */

async function bootstrap() {

  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const queue_input = configService.get<string>('QUEUE_INPUT')
  const host = configService.get<string>('TRANSPORT_HOST')
  //const user = configService.get<string>('TRANSPORT_USER')
  //const password = configService.get<string>('TRANSPORT_PASSWORD')
  const port = parseInt(configService.get<string>('TRANSPORT_PORT'))

  // docker run -d --hostname demo-rabbit -p 5672:5672 -p 15672:15672 --name demo-rabbit rabbitmq:3-management
  // Rabit UI:  http://localhost:15672    (user: guest / password: guest)
  //        
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
      //urls: [`amqp://${user}:${password}@${host}:${port}`],
      urls: [`amqp://${host}:${port}`],
      queue: `${queue_input}`,
      queueOptions: {
        durable: true, //persistent
      },
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, 
      microserviceOptions);

    await app.listen();
}

/* ----------------------------------------- */

bootstrap();
