export const getLocalAccessTokenExp = () => {
    return localStorage.getItem(ACCESS_TOKEN_EXP) || '';
};
export const getLocalAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || '';
};
export const getLocalRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || '';
};

export const LOGGED_IN = 'logged_in';
export const ACCESS_TOKEN_KEY = 'access-token';
export const ACCESS_TOKEN_EXP = 'access-token-exp';
export const REFRESH_TOKEN_KEY = 'refresh-token';
export const LAST_LOGIN = 'last-login';
export const LAST_PASSWORD = 'last-password';
export const LAST_REMEMBER = 'last-remember';
export const DRAWER_IS_OPENED = 'drawer-is-opened';
export const OPENED_ITEM = 'opened-item';

export const drawerWidth = 200;
