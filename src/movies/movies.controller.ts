import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entity/Movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}


    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get("/search")
    search(@Query("id") id:number) : Movie{
        return this.moviesService.getOne(id);
    }

    @Get('/:id')
    getOne(@Param("id") id: number) {
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() data: CreateMovieDto) {
        return this.moviesService.create(data);
    }

    @Delete("/:id")
    remove(@Param("id") id: number) {
        return this.moviesService.deleteOne(id);
    }

    @Patch("/:id")
    path(@Param("id") id:number, @Body() data: UpdateMovieDto){
        this.moviesService.update(id, data);
    }
}
