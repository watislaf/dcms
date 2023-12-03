import { AuthBindings } from '@refinedev/core';
import { LAST_LOGIN, LAST_PASSWORD, LAST_REMEMBER, LOGGED_IN } from 'src/utils/constant';
import { apis } from 'src/api/initializeApi';
import { Failure, Success } from 'src/utils/errorHandlers';
import { setToken, unsetToken } from 'src/utils/tokenService';

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
            setToken(data);
            localStorage.setItem(LOGGED_IN, 'true');

            return Success.redirect('/');
        } catch (error) {
            return Failure.from(error);
        }
    },
    logout: async () => {
        localStorage.removeItem(LOGGED_IN);

        apis().auth.logout().then(unsetToken);

        return {
            success: true,
            redirectTo: '/login',
        };
    },
    check: async () => {
        const loggedIn = localStorage.getItem(LOGGED_IN);

        if (loggedIn) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            redirectTo: '/login',
        };
    },
    getPermissions: async () => ['admin'],
    getIdentity: async () => {
        const loggedIn = localStorage.getItem(LOGGED_IN);

        if (loggedIn) {
            return {
                id: 1,
                name: 'Vladislav Kozulin',
                avatar: 'https://i.pravatar.cc/300',
            };
        }

        return null;
    },

    onError: async (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem(LOGGED_IN);
            unsetToken();
            return {
                redirectTo: '/login',
            };
        }

        return {};
    },
};
