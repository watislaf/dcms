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



/**
 * 
 * @export
 * @interface SorterDto
 */
export interface SorterDto {
    /**
     * 
     * @type {string}
     * @memberof SorterDto
     */
    'field': string;
    /**
     * 
     * @type {string}
     * @memberof SorterDto
     */
    'order': SorterDtoOrderEnum;
}

export const SorterDtoOrderEnum = {
    Asc: 'asc',
    Desc: 'desc'
} as const;

export type SorterDtoOrderEnum = typeof SorterDtoOrderEnum[keyof typeof SorterDtoOrderEnum];


