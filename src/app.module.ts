import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/services/user.module';
import { UserService } from './users/services/user.service';
import { DepartmentModule } from './departments/services/department.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://admin1:Flipmone1@cluster0.cvhh9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"),UserModule,DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
