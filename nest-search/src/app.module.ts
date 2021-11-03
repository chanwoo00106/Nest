import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest_search', {
      autoCreate: true,
    }),
    ItemsModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class AppModule {}
