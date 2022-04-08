import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './Entities/files';

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
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async s3_upload(file: Buffer, name: string, mimetype: string) {
    if (await this.fileRepository.findOne({ name: name }))
      throw new BadRequestException('already exsit name');
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.configService.get<string>('AWS_REGION'),
      },
    };

    try {
      const result = await this.s3.upload(params).promise();
      const newFile = await this.fileRepository.create({
        name,
        url: result.Location,
        mimetype,
      });
      this.fileRepository.save(newFile);
      Logger.log(`${name} success upload`);
    } catch (e) {
      Logger.error(`${name} failed upload`, e);
      throw new BadRequestException(e);
    }
  }
}
