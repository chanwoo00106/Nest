import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  CreateStudentDto,
  UpdateStudentDto,
  FindStudentResponseDto,
  StudentResponseDto,
} from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/')
  getStudents(): StudentResponseDto[] {
    return this.studentService.getStudent();
  }
  @Get('/:studentId')
  getStudentById(
    @Param('studentId', new ParseUUIDPipe()) id: string,
  ): FindStudentResponseDto {
    console.log(id);
    return this.studentService.findOne(id);
  }

  @Post()
  createStudent(@Body() data: CreateStudentDto): string {
    this.studentService.create(data);
    return '성공';
  }

  @Put('/:studentId')
  updateStudnt(
    @Param('studentId') studentId: string,
    @Body() body: UpdateStudentDto,
  ): StudentResponseDto {
    return this.studentService.update(studentId, body);
  }
}
