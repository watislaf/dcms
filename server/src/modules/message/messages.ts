export type MessagedError = {
    message: string;
    name: string;
};

export const INCORRECT_LOGIN_OR_PASSWORD: MessagedError = {
    name: 'Login error',
    message: 'Incorrect login or password',
};
