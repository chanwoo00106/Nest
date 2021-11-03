import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('student')
export class StudentController {
  @Get()
  getStudents() {
    return 'All Students';
  }
  @Get('/:studentId')
  getStudentById(@Param('studentId') id) {
    return id;
  }

  @Post()
  createStudent() {
    return '';
  }

  @Put()
  updateStudnt() {
    return 'update';
  }
}
