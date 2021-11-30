import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(email: string, password: string): string {
    return `${email} ${password}`;
  }
}
