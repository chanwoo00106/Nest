import { Injectable } from '@nestjs/common';
import { teachers } from 'src/db';
import {
  FindTeacherResponseDto,
  CreateTeacherDto,
  TeacherResponseDto,
  UpdateTeacherDto,
} from './dto/teacher.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TeachersService {
  private t = teachers;

  getTeacher() {
    return this.t;
  }

  findOne(id: string): FindTeacherResponseDto {
    return this.t.find((i) => i.id === id);
  }

  create(data: CreateTeacherDto) {
    this.t.push({
      id: uuid(),
      ...data,
    });
  }

  update(id: string, data: UpdateTeacherDto) {
    let student: TeacherResponseDto;
    const updateStudents = this.t.map((i) => {
      if (i.id === id) {
        return {
          id,
          ...data,
        };
      } else return i;
    });

    this.t = updateStudents;

    return student;
  }
}
