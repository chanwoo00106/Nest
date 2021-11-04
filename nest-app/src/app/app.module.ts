import { Module } from '@nestjs/common';
import { StudentModule } from 'src/student/student.module';
import { TeachersModule } from 'src/teachers/teachers.module';

@Module({
  imports: [StudentModule, TeachersModule],
})
export class AppModule {}
