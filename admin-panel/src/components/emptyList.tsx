import React from 'react';
import { useGo, useResource, useTranslate } from '@refinedev/core';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export const EmptyList = () => {
    const go = useGo();

    const { resource, action } = useResource();
    console.log(resource?.create);
    const t = useTranslate();

    return (
        <Grid display="flex" justifyContent="center" alignItems="center" mt={20}>
            <Grid container direction="column" display="flex" alignItems="center">
                <Typography variant="h1">{t('list.empty.header')}</Typography>
                <Stack direction="row" spacing="2">
                    <Typography>{t('list.empty.content')}</Typography>
                </Stack>
                <Button
                    onClick={() => {
                        go({ to: '/' });
                    }}
                >
                    {t('list.empty.button')}
                </Button>
            </Grid>
        </Grid>
    );
};
