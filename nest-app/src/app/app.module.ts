import { Module } from '@nestjs/common';
import { StudentController } from 'src/student/student.controller';
import { StudentService } from 'src/student/student.service';
import { TeachersController } from 'src/teachers/teachers.controller';
import { TeachersService } from 'src/teachers/teachers.service';

@Module({
  imports: [],
  controllers: [StudentController, TeachersController],
  providers: [StudentService, TeachersService],
})
export class AppModule {}
