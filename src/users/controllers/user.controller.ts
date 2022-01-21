import { Body, Controller, Get, Post } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateUserRequestBody, CreateUserResponseBody } from '../entities/user.entity';



@Controller('user')
@ApiTags('User')
export class UserController {
   

    @Post('/')
    @ApiOperation({ summary: 'Subscribe' })
    @ApiResponse({ status: 201, description: 'Subscription created.' })
    subscribe(@Body() user: CreateUserRequestBody): Promise<CreateUserResponseBody> {
        // return this.subscriptionService.createSubscription(subscription);
        return
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
