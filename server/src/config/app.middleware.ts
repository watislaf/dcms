import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '@repos/user/user.service';
import { JwtServiceWrapper } from '@/modules/jwt-service-wrapper.service';

interface UserRequest extends Request {
    user: any;
}

@Injectable()
export class isAuthenticated implements NestMiddleware {
    constructor(
        private readonly jwt: JwtServiceWrapper,
        private readonly userService: UserService
    ) {}

    async use(req: UserRequest, res: Response, next: NextFunction) {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = await this.jwt.verify(token);
            const user = await this.userService.getOne(decoded.email);
            if (user) {
                req.user = user;
                next();
            } else {
                throw new UnauthorizedException();
            }
        } else {
            throw new NotFoundException('No token found');
        }
        try {
        } catch {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }
}
