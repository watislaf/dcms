export type MessagedError = {
    message: string;
    name: string;
    rollbarMessage?: string;
};

export const INCORRECT_LOGIN_OR_PASSWORD: MessagedError = {
    name: 'Login error',
    message: 'Incorrect login or password',
};

export const UNACCESABLE: MessagedError = {
    name: 'Unavailable',
    message: 'Please make sure that you have an access to the service',
};

export const SOMETHING_WENT_WRONG: MessagedError = {
    name: 'Something went wrong',
    message: 'Please try again later',
};

export const UNABLE_TO_GENERATE_USER_ID: MessagedError = {
    ...SOMETHING_WENT_WRONG,
    rollbarMessage: 'Unable to generate user id ',
};
