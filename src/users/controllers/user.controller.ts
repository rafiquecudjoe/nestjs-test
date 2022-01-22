import { Body, Controller, Get, Post,Res } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateUserRequestBody, CreateUserResponseBody, DeleteUserRequestBody } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { Response } from 'express';



@Controller('user')
@ApiTags('User')
export class UserController {
   constructor(private  userService:UserService) {}

    @Post('/signup')
    @ApiOperation({ summary: 'Subscribe' })
    @ApiResponse({ status: 201, description: 'Subscription created.' })
    async adminUserCreate(@Body() user: CreateUserRequestBody, @Res() res: Response){
        const response = await this.userService.createUser(user)
        
        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data 

        })
    }
    
    @Post('/delete')
    @ApiOperation({ summary: 'Subscribe' })
    async adminUserDelete(@Body() user: DeleteUserRequestBody, @Res() res: Response) {
        const response = await this.userService.deleteUser(user)

        return res.status(response.statusCode).json({
            message: response.message,
            data: response.data

        })
    }



    

    // @Get('/')
    // @ApiOperation({ summary: 'Fetch all subscribers' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'Subscriptions fetched successfuly',
    //     type: Subscription,
    //     isArray: true
    // })
    // viewSubscriptions(): Observable<Subscription[]> {
    //     return this.subscriptionService.getSubscriptions();
    // }
}
