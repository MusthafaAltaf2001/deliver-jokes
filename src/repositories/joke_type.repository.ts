import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { joke_type } from '../entities';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class JokeTypeRepository extends AbstractRepository<joke_type> {
    constructor(
        @InjectRepository(joke_type) jokeTypeRepository: Repository<joke_type>,
    ) {
        super(jokeTypeRepository)
    }
}