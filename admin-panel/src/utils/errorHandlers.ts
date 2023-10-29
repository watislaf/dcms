import { DEFAULT_ERROR, ErrorMessage, NETWORK_ERROR } from 'src/utils/errors';
import { AxiosError } from 'axios';

class _Success {
    to(redirectTo: string) {
        return { success: true, redirectTo };
    }
}

type ErrorMessageContainer = {
    response: {
        data: ErrorMessage;
    };
};

const containsErrorMessage = (error: any): error is ErrorMessageContainer => {
    return error?.response?.data?.message && error?.response?.data?.name;
};

class _Failure {
    from(error: any) {
        console.log(error);
        let errorMessage = DEFAULT_ERROR;

        if (error.code === AxiosError.ERR_NETWORK) {
            errorMessage = NETWORK_ERROR;
        }

        if (containsErrorMessage(error)) {
            errorMessage = error.response.data;
        }

        return { success: false, error: errorMessage };
    }
}

export const Success = new _Success();
export const Failure = new _Failure();
