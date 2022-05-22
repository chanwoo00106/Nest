import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

interface NamesType {
  id: number;
  name: string;
}

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello(a: string): Promise<number> {
    if (isNaN(Number(a))) throw new BadRequestException();

    return Number(a);
  }

  async save(name: string): Promise<NamesType> {
    return this.prisma.names.create({ data: { name } });
  }

  async findById(id: number): Promise<NamesType> {
    return this.prisma.names.findFirst({
      where: { id },
    });
  }
}
