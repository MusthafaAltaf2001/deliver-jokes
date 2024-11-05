import { Injectable } from '@nestjs/common';
import { JokeTypeRepository } from './repositories/joke_type.repository';
import { joke_type } from './entities';

@Injectable()
export class JokesService {

    constructor(
        private readonly jokeTypeRepository: JokeTypeRepository,
    ) { }

    async allJokeTypes(): Promise<joke_type[]> {
        // Get all joke types
        const jokeTypes = await this.jokeTypeRepository.findAll();
        console.log(jokeTypes)
        return jokeTypes
    }
}
