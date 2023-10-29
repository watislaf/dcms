export type ErrorMessage = {
    name: string;
    message: string;
};

const of = (name: string, message: string): ErrorMessage => ({ name, message });

export const DEFAULT_ERROR = of('Unknown problem', 'Please write to the support team');
export const NETWORK_ERROR = of('Network problems', 'Please check the connection to the internet');
