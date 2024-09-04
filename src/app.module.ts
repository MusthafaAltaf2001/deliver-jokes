import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JokesModule } from './jokes/jokes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jokes, jokes_type } from './jokes/joke.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'azure-sql.mysql.database.azure.com',
      port: 3306,
      username: 'rootuser',
      password: '}AxJ0r9U2*b3',
      database: 'jokes_db',
      entities: [jokes, jokes_type],
      synchronize: true,
    }),
    JokesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
