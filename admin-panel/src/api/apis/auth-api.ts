/* tslint:disable */
/* eslint-disable */
/**
 * Fasterbase
 * Fasterbase API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { AuthLoginDto } from '../models';
// @ts-ignore
import { JwtTokenDTO } from '../models';
/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {AuthLoginDto} authLoginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signIn: async (authLoginDto: AuthLoginDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'authLoginDto' is not null or undefined
            assertParamExists('signIn', 'authLoginDto', authLoginDto)
            const localVarPath = `/api/v1/auth/signin`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(authLoginDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {AuthLoginDto} authLoginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signUp: async (authLoginDto: AuthLoginDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'authLoginDto' is not null or undefined
            assertParamExists('signUp', 'authLoginDto', authLoginDto)
            const localVarPath = `/api/v1/auth/signup`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(authLoginDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {AuthLoginDto} authLoginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async signIn(authLoginDto: AuthLoginDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<JwtTokenDTO>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.signIn(authLoginDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {AuthLoginDto} authLoginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async signUp(authLoginDto: AuthLoginDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthLoginDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.signUp(authLoginDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthApiFp(configuration)
    return {
        /**
         * 
         * @param {AuthLoginDto} authLoginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signIn(authLoginDto: AuthLoginDto, options?: any): AxiosPromise<JwtTokenDTO> {
            return localVarFp.signIn(authLoginDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {AuthLoginDto} authLoginDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        signUp(authLoginDto: AuthLoginDto, options?: any): AxiosPromise<AuthLoginDto> {
            return localVarFp.signUp(authLoginDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * 
     * @param {AuthLoginDto} authLoginDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public signIn(authLoginDto: AuthLoginDto, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).signIn(authLoginDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {AuthLoginDto} authLoginDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public signUp(authLoginDto: AuthLoginDto, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).signUp(authLoginDto, options).then((request) => request(this.axios, this.basePath));
    }
}

