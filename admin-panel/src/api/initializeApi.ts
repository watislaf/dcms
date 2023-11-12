import { AuthApi } from 'src/api/apis/auth-api';
import { Configuration } from 'src/api/configuration';
import { TOKEN_KEY } from 'src/utils/constant';
import { API_URL } from 'src/utils/env';
import { UsersApi } from 'src/api/apis/users-api';
import { MaterialsApi } from 'src/api/apis/materials-api';

export const initializeApis = () => {
    const configuration = new Configuration({
        basePath: API_URL,
        accessToken: localStorage.getItem(TOKEN_KEY) || undefined,
        baseOptions: {
            timeout: 5000,
        },
    });

    return {
        auth: new AuthApi(configuration),
        users: new UsersApi(configuration),
        materials: new MaterialsApi(configuration),
    };
};

let _apis: ReturnType<typeof initializeApis>;

export const apis = () => {
    if (!_apis) {
        _apis = initializeApis();
    }

    return _apis;
};
