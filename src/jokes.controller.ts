import { Controller } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class JokesController {
    constructor(private readonly jokesService: JokesService) { }

    // Gets all the joke types from the database
    @MessagePattern({ cmd: 'all_joke_types' })
    async allJokeTypes() {
        return this.jokesService.allJokeTypes();
    }
}
