import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ResponseService } from '@/modules/message/response.service';
import { JwtWrapper } from '@/modules/jwt/jwtWrapper.service';
import { UNACCESABLE } from '@/modules/message/messages';
import { Repository } from '@/database/repository.service';

interface UserRequest extends Request {
    user: any;
}

@Injectable()
export class isAuthenticated implements NestMiddleware {
    constructor(
        private readonly jwt: JwtWrapper,
        private readonly response: ResponseService,
        private readonly repo: Repository
    ) {}

    async use(req: UserRequest, res: Response, next: NextFunction) {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = await this.jwt.verify(token);
            const user = await this.repo.users().findByEmail(decoded.email);
            if (user) {
                req.user = user;
                return next();
            }
        }
        this.response.withUnauthorized(UNACCESABLE);
    }
}
