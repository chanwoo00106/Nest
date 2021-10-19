import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entity/Movie.entity';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}


    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get("/search")
    search(@Query("id") id:string) : Movie{
        return this.moviesService.getOne(id);
    }

    @Get('/:id')
    getOne(@Param("id") id: string) {
        return "id : " + id
    }

    @Post()
    create(@Body() data) {
        return this.moviesService.create(data);
    }

    @Delete("/:id")
    remove(@Param("id") id: string) {
        return this.moviesService.deleteOne(id);
    }

    @Patch("/:id")
    path(@Param("id") id:string, @Body() data){
        return {
            id,
            ...data
        }
    }
}
