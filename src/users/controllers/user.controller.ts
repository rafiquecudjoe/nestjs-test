import { Body, Controller, Delete, Get, Patch, Post,Res } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AssignToDepartmentRequestBody, CreateUserRequestBody, CreateUserResponseBody, DeleteUserRequestBody, GetUsersInDepartmentRequestBody } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { Response } from 'express';



@Controller('user')
export class UserController {
   constructor(private  userService:UserService) {}

    @ApiTags('Super Admin Endpoints')
    @Post('/create')
    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({ status: 200, description: 'User created successfully.' })  
    async adminUserCreate(@Body() user: CreateUserRequestBody, @Res() res: Response){
        const response = await this.userService.createUser(user)
        
        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data 
        })
    }
    
    @ApiTags('Super Admin Endpoints')
    @Delete('')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({ status: 200, description: 'User deleted successfully.' })  
    async adminUserDelete(@Body() user: DeleteUserRequestBody, @Res() res: Response) {
        const response = await this.userService.deleteUser(user)

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }

    @ApiTags('Super Admin Endpoints')
    @Get()
    @ApiOperation({ summary: 'list all users' })
    @ApiResponse({ status: 200, description: 'All users Retrieved successfully.' })  
    async allUsers( @Res() res: Response) {
        const response = await this.userService.getUsers()

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }

    @ApiTags('Super Admin Endpoints')
    @Post('/assign/department')
    @ApiOperation({ summary: 'Assign a user to a department' })
    @ApiResponse({ status: 200, description: 'User successfully assigned to Department.' })  
    async assignToDepartment(@Body() request: AssignToDepartmentRequestBody,@Res() res: Response) {
        const response = await this.userService.assignUserToDepartment(request)

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }

    @ApiTags('Department Manager Endpoints')
    @Post('/department')
    @ApiOperation({ summary: 'Get users in a department' })
    @ApiResponse({ status: 200, description: 'Users in department retrived successfully.' })
    async GetUsersInDepartment(@Body() request: GetUsersInDepartmentRequestBody, @Res() res: Response) {
        const response = await this.userService.getUsersInDepartment(request)

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }




  
}
