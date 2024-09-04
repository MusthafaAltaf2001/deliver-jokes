import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { jokes, jokes_type } from './joke.entity';

@Injectable()
export class JokesService {
    constructor(
        @InjectRepository(jokes)
        private jokesRepository: Repository<jokes>,

        @InjectRepository(jokes_type)
        private jokesTypeRepository: Repository<jokes_type>,
    ) { }

    // async getRandomJoke(type: number): Promise<jokes> {
    //     const allJokes = await this.jokesTypeRepository.find({ where: { type } });
    //     const randomIndex = Math.floor(Math.random() * allJokes.length);
    //     return allJokes[randomIndex];
    // }

    async getJokeTypes(): Promise<Object[]> {
        // Get all joke types
        const jokeTypes = await this.jokesTypeRepository.find();
        return jokeTypes
    }

    async addModeratedJoke(content: string, type: string): Promise<jokes> {
        const newJoke = this.jokesRepository.create({})
        newJoke.content = content;
        newJoke.type = 0;
        return this.jokesRepository.save(newJoke);
    }
}
