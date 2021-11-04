import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  CreateTeacherDto,
  TeacherResponseDto,
  UpdateTeacherDto,
} from './dto/teacher.dto';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teacher: TeachersService) {}
  @Get()
  getTeachers(): TeacherResponseDto[] {
    return this.teacher.getTeacher();
  }
  @Get('/:studentId')
  getTeacherById(@Param('studentId') id: string): TeacherResponseDto {
    return this.teacher.findOne(id);
  }

  @Post()
  createTeacher(@Body() data: CreateTeacherDto): string {
    this.teacher.create(data);
    return '성공';
  }

  @Put('/:teacherId')
  updateTeacher(
    @Param('teacherId') id: string,
    @Body() data: UpdateTeacherDto,
  ): UpdateTeacherDto {
    return this.teacher.update(id, data);
  }
}
