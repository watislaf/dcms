import { AuthBindings } from '@refinedev/core';
import { LAST_LOGIN, LAST_PASSWORD, LAST_REMEMBER, TOKEN_KEY } from 'src/utils/constant';
import { apis } from 'src/api/initializeApi';
import { Failure, Success } from 'src/utils/errorHandlers';

function handleRemember(remember: boolean, email: string, password: string) {
    if (remember) {
        localStorage.setItem(LAST_LOGIN, email);
        localStorage.setItem(LAST_PASSWORD, password);
        localStorage.setItem(LAST_REMEMBER, 'true');
    } else {
        localStorage.removeItem(LAST_LOGIN);
        localStorage.removeItem(LAST_PASSWORD);
        localStorage.removeItem(LAST_REMEMBER);
    }
}

export const authProvider: AuthBindings = {
    login: async ({ email, password, remember }) => {
        handleRemember(remember, email, password);

        try {
            const { data } = await apis().auth.signIn({ email, password });
            localStorage.setItem(TOKEN_KEY, data.token);
            return Success.redirect('/');
        } catch (error) {
            return Failure.from(error);
        }
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        return {
            success: true,
            redirectTo: '/login',
        };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (token) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            redirectTo: '/login',
        };
    },
    getPermissions: async () => ['editor'],
    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (token) {
            return {
                id: 1,
                name: 'John Doe',
                avatar: 'https://i.pravatar.cc/300',
            };
        }

        return null;
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
};
