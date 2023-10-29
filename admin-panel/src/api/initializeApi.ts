import { AuthApi } from 'src/api/apis/auth-api';
import { Configuration } from 'src/api/configuration';
import { TOKEN_KEY } from 'src/utils/constant';
import { API_URL } from 'src/utils/env';

export const initializeApis = () => {
    const configuration = new Configuration({
        basePath: API_URL,
        accessToken: localStorage.getItem(TOKEN_KEY) || undefined,
        baseOptions: {
            timeout: 300,
        },
    });

    return {
        auth: new AuthApi(configuration),
    };
};

let _apis: ReturnType<typeof initializeApis>;

export const apis = () => {
    if (!_apis) {
        _apis = initializeApis();
    }

    return _apis;
};
