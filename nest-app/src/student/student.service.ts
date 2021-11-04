import { Injectable } from '@nestjs/common';
import { students } from 'src/db';
import {
  CreateStudentDto,
  StudentResponseDto,
  UpdateStudentDto,
} from './dto/student.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  private s = students;

  getStudent() {
    return this.s;
  }

  findOne(id: string) {
    return this.s.find((i) => i.id === id);
  }

  create(data: CreateStudentDto) {
    this.s.push({
      id: uuid(),
      ...data,
    });
  }

  update(id: string, data: UpdateStudentDto) {
    let student: StudentResponseDto;
    const updateStudents = this.s.map((i) => {
      if (i.id === id) {
        return {
          id,
          ...data,
        };
      } else return i;
    });

    this.s = updateStudents;

    return student;
  }
}
