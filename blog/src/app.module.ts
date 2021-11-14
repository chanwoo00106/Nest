import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    RegisterModule,
    MongooseModule.forRoot('mongodb://localhost:27017/chanlog'),
    LoginModule,
    BlogModule,
  ],
})
export class AppModule {}
