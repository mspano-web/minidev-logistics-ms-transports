import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { transportProviders } from './repositories/transport.providers';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Transportation } from './entities';
import { RqRsFactoryService } from './services/rq-rs-factory.service';
import { RQ_RS_FACTORY_SERVICE } from './interfaces';

/* ----------------------------------------- */

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        models: [Transportation],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([Transportation]),
  ],
  controllers: [AppController],
  providers: [AppService, 
  ...transportProviders,
  {
    provide: 'RABBIT_SERVICE_ZONES',
    useFactory: (configService: ConfigService) => {
      const queue_input = configService.get<string>('ZONES_QUEUE_INPUT')
      const host = configService.get<string>('ZONES_HOST')
      //const user = configService.get<string>('ZONES_USER')
      //const password = configService.get<string>('ZONES_PASSWORD')
      const port = parseInt(configService.get<string>('ZONES_PORT'))

      return ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          //urls: [`amqp://${user}:${password}@${host}:${port}`],
          urls: [`amqp://${host}:${port}`],
          queue: `${queue_input}`,
          queueOptions: {
            durable:  true, //persistent
          },
        },
      });       
    },
    inject: [ConfigService],
  },
  {
    useClass: RqRsFactoryService, // You can switch useClass to different implementation
    provide: RQ_RS_FACTORY_SERVICE,
  },

]
})

/* ----------------------------------------- */

export class AppModule {}
