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

    async getRandomJoke(type: number) {
        const allJokeTypes = await this.getJokeTypes();
        const selectedJokeType = allJokeTypes.find(jokeType => jokeType.joke_type_id === type);
        const allJokes = await this.jokesRepository.find({ where: { type: selectedJokeType.joke_type_id } });
        const randomIndex = Math.floor(Math.random() * allJokes.length);
        return allJokes[randomIndex];
    }

    async getJokeTypes(): Promise<jokes_type[]> {
        // Get all joke types
        const jokeTypes = await this.jokesTypeRepository.find();
        return jokeTypes
    }

    async addModeratedJoke(content: string, type: string): Promise<jokes> {
        const allJokeTypes = await this.getJokeTypes();
        const selectedJokeType = allJokeTypes.find(jokeType => jokeType.joke_type_text === type);
        const newJoke = this.jokesRepository.create({})
        newJoke.content = content;
        newJoke.type = selectedJokeType.joke_type_id;
        return this.jokesRepository.save(newJoke);
    }

    async addNewJokeType(type: string): Promise<jokes_type> {
        const newJokeType = this.jokesTypeRepository.create({})
        newJokeType.joke_type_text = type;
        return this.jokesTypeRepository.save(newJokeType);
    }
}
