import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { joke } from '../entities';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class JokeRepository extends AbstractRepository<joke> {
    constructor(
        @InjectRepository(joke) jokeRepository: Repository<joke>,
    ) {
        super(jokeRepository)
    }
}