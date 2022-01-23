import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../src/users/schemas/user.schema';
import { Roles } from "../../src/users/entities/user.entity"

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async use(req: Request, res: Response, next: NextFunction,) {

        // checking if the request came with a client key
        if (!req.headers['accesstoken']) {
            return res.status(401).send({
                message: 'No access token was submitted'
            });
        }

        const accessToken = <string>req.headers['accesstoken']

        const user = await this.userModel.findOne({ accessToken })



        if (!user) {
            return res.status(401).send({
                status: 401,
                message: 'You are not a Registered User',
            });
        }

        if (accessToken === user.accessToken) {

        

            if (user.role === Roles.SUPER_ADMIN) {


                // success
                next();
            } else {
                return res.status(401).send({
                    status: 401,
                    message: 'Unauthorized',
                });
            }
        }

    }
}