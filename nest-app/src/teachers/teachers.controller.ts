import { Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('teachers')
export class TeachersController {
  @Get()
  getTeachers() {
    return 'All Students';
  }
  @Get('/:studentId')
  getTeacherById(@Param('studentId') id) {
    return id;
  }

  @Post()
  createTeacher() {
    return '';
  }

  @Put()
  updateTeacher() {
    return 'update';
  }
}
