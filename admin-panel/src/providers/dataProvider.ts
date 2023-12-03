import axios from 'axios';
import { DataProvider, HttpError } from '@refinedev/core';
import { apis } from 'src/api/initializeApi';

// Error handling with axios interceptors
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
        };

        return Promise.reject(customError);
    }
);

export enum ResourceList {
    Users = 'users',
    Materials = 'materials',
}

const resources = Object.values(ResourceList);

export const getApiResources = () => {
    return resources.map((resource) => ({
        name: `${resource}`,
        list: `/${resource}`,
        create: `/${resource}`,
        edit: `/${resource}/:id`,
        show: `/${resource}/:id`,
    }));
};

export const adapter = {
    users: {
        getList: apis().users.findAllUsers,
    },
};

export const dataProvider: DataProvider = {
    getList: async ({ resource, pagination, sorters, filters }) => {
        const filledPagination = {
            pageSize: pagination?.pageSize || 10,
            current: pagination?.current || 0,
        };

        const filledSorters = sorters || [];

        if (filters) {
            console.log('FILTERS ARE NOT IMPLEMENTED', filters);
        }

        const { data, headers } = await apis().users.findAllUsers({
            pagination: filledPagination,
            sorters: filledSorters,
        });

        return data;
    },
};
