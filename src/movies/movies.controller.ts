import { Controller, Get, Param } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll() {
        return '뷁';
    }

    @Get('/:id')
    getOne(@Param("id") id: string) {
        return "id : " + id
    }
}
