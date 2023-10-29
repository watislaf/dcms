import { AuthBindings } from '@refinedev/core';
import { TOKEN_KEY } from 'src/utils/constant';
import { apis } from 'src/api/initializeApi';
import { Failure, Success } from 'src/utils/errorHandlers';

export const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        try {
            const { data } = await apis().auth.signIn({ email, password });
            localStorage.setItem(TOKEN_KEY, data.token);
            return Success.to('/');
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
