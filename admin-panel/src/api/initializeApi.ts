import { AuthApi } from 'src/api/apis/auth-api';
import { Configuration } from 'src/api/configuration';
import { getLocalAccessToken, getLocalAccessTokenExp, getLocalRefreshToken } from 'src/utils/constant';
import { API_URL } from 'src/utils/env';
import { UsersApi } from 'src/api/apis/users-api';
import { MaterialsApi } from 'src/api/apis/materials-api';
import { setToken } from 'src/utils/tokenService';
import globalAxios from 'axios';
import i18n from 'i18next';

export class NoAccess extends Error {}

globalAxios.interceptors.request.use((config) => {
    if (!config.headers.get('Accept-Language')) config.headers.set('Accept-Language', i18n.language);

    return config;
});

const getAccessToken = (): Promise<string> =>
    new Promise((resolve) => {
        if (!getLocalAccessTokenExp()) {
            resolve('');
        }

        const maxRequestTimeSec = 10;
        console.log(getLocalAccessTokenExp());

        const restTime = +(getLocalAccessTokenExp() || 0) - Date.now() / 1000 - maxRequestTimeSec;

        if (restTime <= 0) {
            const refreshToken = getLocalRefreshToken();

            apis()
                .auth.refresh({ refreshToken })
                .then(({ data }) => {
                    setToken(data);
                    resolve(getLocalAccessToken());
                })
                .catch((_) => resolve(''));
        } else {
            resolve(getLocalAccessToken());
        }
    });

export const initializeApis = () => {
    const configuration = new Configuration({
        basePath: API_URL,
        accessToken: getAccessToken,
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
