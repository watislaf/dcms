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


// May contain unused imports in some cases
// @ts-ignore
import { AuthLoginDto } from './auth-login-dto';

/**
 * 
 * @export
 * @interface VideoDto
 */
export interface VideoDto {
    /**
     * 
     * @type {string}
     * @memberof VideoDto
     */
    'title': string;
    /**
     * 
     * @type {string}
     * @memberof VideoDto
     */
    'video': string;
    /**
     * 
     * @type {string}
     * @memberof VideoDto
     */
    'coverImage': string;
    /**
     * 
     * @type {string}
     * @memberof VideoDto
     */
    'uploadDate': string;
    /**
     * 
     * @type {AuthLoginDto}
     * @memberof VideoDto
     */
    'createdBy': AuthLoginDto;
}

