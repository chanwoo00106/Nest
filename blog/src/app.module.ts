import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    RegisterModule,
    MongooseModule.forRoot('mongodb://localhost:27017/chanlog'),
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
