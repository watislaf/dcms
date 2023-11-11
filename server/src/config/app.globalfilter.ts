import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ROLLBAR_TOKEN } from '@/config/env';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Rollbar = require('rollbar');

let _rollbar;
const rollbar = () => {
    if (!_rollbar) {
        _rollbar = new Rollbar({
            accessToken: ROLLBAR_TOKEN(),
            captureUncaught: true,
            captureUnhandledRejections: true,
        });
    }
    return _rollbar;
};

@Catch()
export class AppGlobalFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void {
        if (exception?.response?.rollbarMessage) {
            rollbar().error(exception, host, exception.response.rollbarMessage);
            delete exception.response.rollbarMessage;
        }
        if (!(exception instanceof HttpException)) {
            rollbar().error(exception, host);
        }

        super.catch(exception, host);
    }
}
