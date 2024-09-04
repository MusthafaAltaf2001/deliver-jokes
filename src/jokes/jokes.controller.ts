import { Controller, Get, Query } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('jokes')
export class JokesController {
    constructor(private readonly jokesService: JokesService) { }

    // @Get('random')
    // async getRandomJoke(@Query('type') type: number) {
    //     return this.jokesService.getRandomJoke(type);
    // }

    // @Get('types')
    // async getJokeTypes() {
    //     return this.jokesService.getJokeTypes();
    // }

    // Add a new approved joke to the database
    @MessagePattern({ cmd: 'add-moderated-joke' })
    async addModeratedJoke(@Payload() content: string, @Payload() type: string) {
        return this.jokesService.addModeratedJoke(content, type);
    }

    // Gets all the joke types from the database
    @MessagePattern({ cmd: 'get-joke-types' })
    async getJokeTypes() {
        return this.jokesService.getJokeTypes();
    }
}
