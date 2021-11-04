import { Controller, Get, Param, Post, Put, Body } from '@nestjs/common';
import {
  CreateStudentDto,
  UpdateStudentDto,
  FindStudentResponseDto,
  StudentResponseDto,
} from './dto/student.dto';

@Controller('students')
export class StudentController {
  @Get('/')
  getStudents(): string {
    return 'All Students';
  }
  @Get('/:studentId')
  getStudentById(@Param('studentId') id): FindStudentResponseDto {
    return;
  }

  @Post()
  createStudent(@Body() data: CreateStudentDto): CreateStudentDto {
    return data;
  }

  @Put('/:studentId')
  updateStudnt(
    @Param('studentId') studentId: string,
    @Body() body: UpdateStudentDto,
  ): StudentResponseDto {
    return;
  }
}
