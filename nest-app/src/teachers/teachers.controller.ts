import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  CreateTeacherDto,
  FindTeacherResponseDto,
  TeacherResponseDto,
  UpdateTeacherDto,
} from './dto/teacher.dto';

@Controller('teachers')
export class TeachersController {
  @Get()
  getTeachers(): TeacherResponseDto[] {
    return;
  }
  @Get('/:studentId')
  getTeacherById(
    @Param('studentId') id: FindTeacherResponseDto,
  ): TeacherResponseDto {
    return;
  }

  @Post()
  createTeacher(): CreateTeacherDto {
    return;
  }

  @Put()
  updateTeacher(): UpdateTeacherDto {
    return;
  }
}
