import { Module,NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/services/user.module';
import { DepartmentModule } from './departments/services/department.module';
import { IsDepartManagerMiddleware } from 'common/middleware/IsDepartManager.middleware';
import { UserController } from './users/controllers/user.controller';
import { IsAdminMiddleware } from 'common/middleware/isAdmin.middleware';


@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://admin1:Flipmone1@cluster0.cvhh9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"),UserModule,DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsDepartManagerMiddleware).forRoutes("user/create", { path: 'user', method: RequestMethod.DELETE }, { path: 'user', method: RequestMethod.GET })
    consumer.apply(IsAdminMiddleware).forRoutes("user/department", "department/create", { path: 'department', method: RequestMethod.DELETE }, { path: 'department', method: RequestMethod.POST }, { path: 'department', method: RequestMethod.PATCH }, "user/assign/department", { path: 'department', method: RequestMethod.POST }, { path: 'department', method: RequestMethod.GET})
  }
}
