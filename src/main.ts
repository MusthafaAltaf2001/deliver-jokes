import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { JokesModule } from './jokes.module';
import { RmqService } from './rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(JokesModule);
  const configService = app.get(ConfigService)
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions());
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();