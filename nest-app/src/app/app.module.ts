import { Module } from '@nestjs/common';
import { StudentController } from 'src/student/student.controller';

@Module({
  imports: [],
  controllers: [],
  providers: [StudentController],
})
export class AppModule {}
