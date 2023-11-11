import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { MessagedError } from '@/modules/message/messages';

@Injectable()
export class ResponseService {
    constructor() {}

    withUnauthorized(messagedError: MessagedError) {
        throw new UnauthorizedException(messagedError);
    }

    internalServerError(messagedError: MessagedError) {
        throw new InternalServerErrorException(messagedError);
    }
}
