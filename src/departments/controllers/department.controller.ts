import { Body, Controller, Delete, Get, Patch, Post,Res } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateDepartmentRequestBody, DeleteDepartmentRequestBody, UpdateDepartmentRequestBody,  } from '../entities/department.entity';
import { DepartmentService} from '../services/department.service';
import { Response } from 'express';


@Controller('department')
@ApiTags('Departments')
export class DepartmentController {
   constructor(private  departmentService:DepartmentService) {}

    @Post('/create')
    @ApiOperation({ summary: 'Subscribe' })
    @ApiResponse({ status: 201, description: 'Subscription created.' })
    async DepartmentCreate(@Body() department: CreateDepartmentRequestBody, @Res() res: Response){
        const response = await this.departmentService.createDepartment(department)
        
        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data 

        })
    }

   

    @Get('')
    @ApiOperation({ summary: 'Subscribe' })
    @ApiResponse({ status: 201, description: 'Subscription created.' })
    async viewDepartments(@Res() res: Response) {
        const response = await this.departmentService.GetDepartments()

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }



    @Delete('')
    @ApiOperation({ summary: 'Subscribe' })
    async adminUserDelete(@Body() user: DeleteDepartmentRequestBody, @Res() res: Response) {
        const response = await this.departmentService.deleteDepartment(user)

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }

    @Get('')
    @ApiOperation({ summary: 'Subscribe' })
    @ApiResponse({ status: 201, description: 'Subscription created.' })
    async viewDepartment(@Body() department: DeleteDepartmentRequestBody,@Res() res: Response) {
        const response = await this.departmentService.GetDepartment(department)

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }

    @Patch('')
    @ApiOperation({ summary: 'Subscribe' })
    @ApiResponse({ status: 201, description: 'Subscription created.' })
    async PatchDepartment(@Body() department: UpdateDepartmentRequestBody, @Res() res: Response) {
        const response = await this.departmentService.patchDepartmentDetails(department)

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }


    
    // @Delete('')
    // @ApiOperation({ summary: 'Subscribe' })
    // async adminDepartmentDelete(@Body() user: DeleteUserRequestBody, @Res() res: Response) {
    //     const response = await this.userService.deleteUser(user)

    //     return res.status(response.statusCode).json({
    //         message: response.message,
    //         data: response.data

    //     })
    // }

    // @Get()
    // @ApiOperation({ summary: 'Subscribe' })
    // async allUsers( @Res() res: Response) {
    //     const response = await this.userService.getUsers()

    //     return res.status(response.statusCode).json({
    //         message: response.message,
    //         data: response.data

    //     })
    // }





  
}
