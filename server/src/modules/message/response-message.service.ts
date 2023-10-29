import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MessagedError } from '@/modules/message/messages';

@Injectable()
export class ResponseMessageService {
    constructor() {}

    withUnauthorized(messagedError: MessagedError) {
        throw new UnauthorizedException(messagedError);
    }
}
