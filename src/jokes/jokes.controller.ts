import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('jokes')
export class JokesController {
    constructor(private readonly jokesService: JokesService) { }

    @Post('random')
    async getRandomJoke(@Body('type') type: number) {
        return this.jokesService.getRandomJoke(type);
    }

    @Post('newJokeType')
    async newJokeType(@Body('type') type: string) {
        return this.jokesService.addNewJokeType(type);
    }

    // @Get('types')
    // async getJokeTypes() {
    //     return this.jokesService.getJokeTypes();
    // }

    // Add a new approved joke to the database
    @MessagePattern({ cmd: 'add-moderated-joke' })
    async addModeratedJoke(@Payload() moderatedJoke: { content: string, type: string }) {
        const { content, type } = moderatedJoke
        return this.jokesService.addModeratedJoke(content, type);
    }

    // Gets all the joke types from the database
    @MessagePattern({ cmd: 'get-joke-types' })
    async getJokeTypes() {
        return this.jokesService.getJokeTypes();
    }
}
