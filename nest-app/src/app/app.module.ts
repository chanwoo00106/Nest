import { Module } from '@nestjs/common';
import { StudentController } from 'src/student/student.controller';
import { StudentService } from 'src/student/student.service';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [StudentService],
})
export class AppModule {}
