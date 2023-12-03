import { IResourceComponentsProps, useGo, useList } from '@refinedev/core';

import React from 'react';
import UnstyledPaginationIntroduction from 'src/components/pagination';
import { EmptyList } from 'src/components/emptyList';
import { Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ProjectTheme } from 'src/themes';
import AddIcon from '@mui/icons-material/Add';

export const UsersList: React.FC<IResourceComponentsProps> = () => {
    const { data } = useList({
        resource: 'users',
        pagination: {
            current: 0,
        },
        queryOptions: {
            retry: 1,
        },
        errorNotification: false,
    });
    const theme = useTheme<ProjectTheme>();

    const go = useGo();

    if (data?.total === 0) {
        return <EmptyList />;
    }
    //
    // const {
    //     getHeaderGroups,
    //     getRowModel,
    //     setOptions,
    //     refineCore: {
    //         setCurrent,
    //         pageCount,
    //         current,
    //         tableQueryResult: { data: tableData },
    //     },
    // } = useTable({
    //
    // });
    //
    // setOptions((prev) => ({
    //     ...prev,
    //     meta: {
    //         ...prev.meta,
    //     },
    // }));

    return (
        <>
            <Grid container direction={'row'} sx={{ mt: 2, mb: 3 }}>
                <IconButton
                    disableRipple
                    onClick={() => {
                        go({ type: 'push', to: 'create' });
                    }}
                    size={'small'}
                    sx={{
                        color: theme.palette.secondary.contrastText,
                        bgcolor: theme.palette.primary.main,
                        mr: { xs: 1 },
                    }}
                >
                    <AddIcon />
                </IconButton>
                <Typography alignSelf={'center'} variant="h5">
                    Users
                </Typography>
            </Grid>
            <UnstyledPaginationIntroduction count={data?.total || 0} />
            {JSON.stringify(data)}
        </>
    );
};
