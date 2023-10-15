import {
    IResourceComponentsProps,
    useShow,
    useOne,
    useInvalidate,
    useDataProvider,
    useApiUrl,
} from '@refinedev/core';
import { Show, NumberField, TextField, MarkdownField, DateField } from '@refinedev/mantine';
import { Button, Title } from '@mantine/core';

export const BlogPostShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult, showId } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne({
        resource: 'categories',
        id: record?.category?.id || '',
        queryOptions: {
            enabled: !!record,
        },
    });

    const invalidate = useInvalidate();
    const dataProvider = useDataProvider()();
    const apiUrl = useApiUrl();

    const customAction = async () => {
        if (dataProvider.custom) {
            await dataProvider.custom({
                url: `${apiUrl}/blog_posts/${showId}`,
                method: 'patch',
                payload: {
                    ...record,
                    title: Math.random(),
                },
            });
            await invalidate({ resource: 'blog_posts', id: showId, invalidates: ['detail'] });
        }
    };

    return (
        <Show isLoading={isLoading}>
            <Button onClick={customAction}>Set random title</Button>
            <Title my="xs" order={5}>
                Id
            </Title>
            <NumberField value={record?.id ?? ''} />
            <Title my="xs" order={5}>
                Title
            </Title>
            <TextField value={record?.title} />
            <Title mt="xs" order={5}>
                Content
            </Title>
            <MarkdownField value={record?.content} />
            <Title my="xs" order={5}>
                Category
            </Title>
            {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>}
            <Title my="xs" order={5}>
                Status
            </Title>
            <TextField value={record?.status} />
            <Title my="xs" order={5}>
                Created At
            </Title>
            <DateField value={record?.createdAt} />
        </Show>
    );
};
