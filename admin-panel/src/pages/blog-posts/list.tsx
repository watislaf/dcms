import { IResourceComponentsProps } from '@refinedev/core';
import { MantineListInferencer } from '@refinedev/inferencer/mantine';
import React from 'react';

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
    return <MantineListInferencer />;
};
