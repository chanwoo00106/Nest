import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entity/Movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies:Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) {
            throw new NotFoundException(`movie with id ${id} not found`)
        }

        return movie;
    }

    deleteOne(id: number){
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(data: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...data
        });
    }

    update(id: number, data: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);

        this.movies.push({
            ...movie,
            ...data
        })
    }
}
