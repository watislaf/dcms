import { JwtTokenDTO } from 'src/api';
import { ACCESS_TOKEN_EXP, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'src/utils/constant';

export const setToken = (data: JwtTokenDTO) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(ACCESS_TOKEN_EXP, '' + data.exp);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
};

export const unsetToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_EXP);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};
