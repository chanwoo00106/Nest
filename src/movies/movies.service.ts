import { Injectable } from '@nestjs/common';
import { Movie } from './entity/Movie.entity';

@Injectable()
export class MoviesService {
    private movies:Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string): Movie {
        return this.movies.find(movie => movie.id === parseInt(id));
    }

    deleteOne(id: string) : boolean{
        try {
            this.movies.filter(movie => movie.id !== parseInt(id));
        } catch {
            return false;
        }
    }

    create(data) {
        this.movies.push({
            id: this.movies.length + 1,
            ...data
        });
    }
}
