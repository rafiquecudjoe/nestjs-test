import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentSchema } from '../schemas/department.schema';
import { DepartmentController } from '../controllers/department.controller';

import { Department } from '../schemas/department.schema'
import { DepartmentService} from './department.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Department.name, schema: DepartmentSchema }]),],
    controllers: [DepartmentController],
    providers: [DepartmentService],
    exports:[DepartmentService]
})
export class DepartmentModule { }
