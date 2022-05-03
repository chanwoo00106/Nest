import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Upload } from './dto/Upload';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  AWS_S3_BUCKET = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  s3 = new AWS.S3({
    accessKeyId: this.configService.get<string>('AWS_S3_ACCESS_KEY'),
    secretAccessKey: this.configService.get<string>('AWS_S3_KEY_SECRET'),
  });

  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async s3_upload(
    file: Buffer,
    name: string,
    mimetype: string,
    data: Upload,
    user: string,
  ) {
    if (
      (!data.name &&
        (await this.prismaService.file.findFirst({ where: { name } }))) ||
      (data.name &&
        (await this.prismaService.file.findFirst({
          where: { name: data.name },
        })))
    )
      throw new BadRequestException('already exsit file name');
    else if (!name.includes('.'))
      throw new BadRequestException('Not found file type');

    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: data.name ? data.name : name,
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.configService.get<string>('AWS_REGION'),
      },
    };

    try {
      const result: any = await this.s3.upload(params).promise();
      await this.prismaService.file.create({
        data: {
          name: data.name ? data.name : name,
          url: result.Location,
          mimetype,
          VersionId: result.VersionId,
          users: {
            connect: {
              id: user,
            },
          },
        },
      });
      Logger.log(`${name} success upload`);
    } catch (e) {
      Logger.error(`${name} failed upload`, e);
      throw new BadRequestException(e);
    }
  }

  async findFile(name: string) {
    const file = await this.prismaService.file.findFirst({ where: { name } });
    const threeLater = new Date(new Date().setDate(new Date().getDate() + 3));
    if (threeLater <= new Date()) {
      await this.prismaService.file.delete({ where: { id: file.id } });
      throw new NotFoundException('Not Found');
    }
    if (!file) throw new NotFoundException('Not Found');
    return file;
  }

  async MyFiles(id: string) {
    const user = await this.prismaService.users.findFirst({
      where: { id },
      include: { file: true },
    });
    return { id: user.id, files: user.file };
  }

  async deleteFile(name: string, id: string) {
    if (!name) throw new BadRequestException();
    const file = await this.prismaService.file.findFirst({
      where: { name },
      include: { users: true },
    });
    if (!file) throw new BadRequestException();
    else if (file.users.id !== id) throw new UnauthorizedException();

    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Delete: {
        Objects: [
          {
            Key: name,
            VersionId: file.VersionId,
          },
        ],
        Quiet: false,
      },
    };

    try {
      await this.s3.deleteObjects(params).promise();

      await this.prismaService.file.delete({ where: { name } });
    } catch (e) {
      Logger.log('failed delete');
      throw new ConflictException('아 몰라');
    }
  }

  async allFiles(pages: string) {
    if (!pages) throw new BadRequestException('page가 없습니다.');
    if (!parseInt(pages))
      throw new BadRequestException('page는 숫자 형식입니다.');
    return this.prismaService.file.findMany({
      skip: parseInt(pages) * 10,
      take: 10,
      include: { users: true },
    });
  }
}
