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
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './Entities/files';
import { Upload } from './dto/Upload';
import { Users } from './Entities/users';

@Injectable()
export class AppService {
  AWS_S3_BUCKET = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  s3 = new AWS.S3({
    accessKeyId: this.configService.get<string>('AWS_S3_ACCESS_KEY'),
    secretAccessKey: this.configService.get<string>('AWS_S3_KEY_SECRET'),
  });

  constructor(
    private configService: ConfigService,
    @InjectRepository(File) private fileRepository: Repository<File>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async s3_upload(
    file: Buffer,
    name: string,
    mimetype: string,
    data: Upload,
    user: string,
  ) {
    if (
      (!data.name && (await this.fileRepository.findOne({ name: name }))) ||
      (data.name && (await this.fileRepository.findOne({ name: data.name })))
    )
      throw new BadRequestException('already exsit file name');
    else if (!name.includes('.'))
      throw new BadRequestException('Not found file type');

    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: data.name
        ? `${data.name}.${name.split('.')[name.split('.').length - 1]}`
        : name,
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
      const newFile = this.fileRepository.create({
        name: data.name
          ? `${data.name}.${name.split('.')[name.split('.').length - 1]}`
          : name,
        url: result.Location,
        mimetype,
        VersionId: result.VersionId,
        user: {
          id: user,
        },
      });
      await this.fileRepository.save(newFile);
      Logger.log(`${name} success upload`);
    } catch (e) {
      Logger.error(`${name} failed upload`, e);
      throw new BadRequestException(e);
    }
  }

  async findFile(name: string) {
    const file = await this.fileRepository.findOne({ name });
    const threeLater = new Date(new Date().setDate(new Date().getDate() + 3));
    if (threeLater <= new Date()) {
      await this.fileRepository.delete({ id: file.id });
      throw new NotFoundException('Not Found');
    }
    if (!file) throw new NotFoundException('Not Found');
    return file;
  }

  async MyFiles(id: string) {
    const user = await this.userRepository.findOne(id, {
      relations: ['files'],
    });
    return { id: user.id, files: user.files };
  }

  async deleteFile(name: string, id: string) {
    if (!name) throw new BadRequestException();
    const file = await this.fileRepository.findOne(
      { name },
      { relations: ['user'] },
    );
    if (!file) throw new BadRequestException();
    else if (file.user.id !== id) throw new UnauthorizedException();

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

      await this.fileRepository.delete({ name: name });
    } catch (e) {
      Logger.log('failed delete');
      throw new ConflictException('아 몰라');
    }
  }
}
