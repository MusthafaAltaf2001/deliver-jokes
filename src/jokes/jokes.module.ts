import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { jokes, jokes_type } from './joke.entity';

@Module({
  imports: [TypeOrmModule.forFeature([jokes, jokes_type])],
  controllers: [JokesController],
  providers: [JokesService],
})
export class JokesModule { }
