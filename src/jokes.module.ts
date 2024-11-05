import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { joke, joke_type } from './entities'
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';
import { JokeTypeRepository } from './repositories/joke_type.repository';
import * as Joi from 'joi'
import { JokeRepository } from './repositories/joke.repository';
import { RmqModule } from './rmq/rmq.module';
import { DELIVER_JOKES_SERVICE } from './utils/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
      }),
      envFilePath: './.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [joke, joke_type],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    RmqModule.register({
      name: DELIVER_JOKES_SERVICE
    }),
    TypeOrmModule.forFeature([joke, joke_type])
  ],
  controllers: [JokesController],
  providers: [JokesService, JokeTypeRepository, JokeRepository],
})
export class JokesModule { }
