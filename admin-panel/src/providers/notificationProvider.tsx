import React from 'react';
import { NotificationProvider } from '@refinedev/core';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import UndoOutlined from '@mui/icons-material/UndoOutlined';
import { CircularDeterminate, useSnackbar } from '@refinedev/mui';

export const notificationProvider = (): NotificationProvider => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();

    const notificationProvider: NotificationProvider = {
        open: ({ message, type, undoableTimeout, key, cancelMutation, description }) => {
            if (type === 'progress') {
                const action = (key: any) => (
                    <IconButton
                        onClick={() => {
                            cancelMutation?.();
                            closeSnackbar(key);
                        }}
                        color="inherit"
                    >
                        <UndoOutlined />
                    </IconButton>
                );

                enqueueSnackbar(
                    <>
                        <CircularDeterminate undoableTimeout={undoableTimeout ?? 0} message={message} />
                    </>,
                    {
                        action,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        },
                        preventDuplicate: true,
                        key,
                        autoHideDuration: (undoableTimeout ?? 0) * 1000,
                        disableWindowBlurListener: true,
                    }
                );
            } else {
                enqueueSnackbar(
                    <Box sx={{ cursor: 'pointer' }} onClick={() => closeSnackbar(key)}>
                        <Typography variant="subtitle2" component="h6">
                            {description}
                        </Typography>
                        <Typography variant="caption" component="p">
                            {message}
                        </Typography>
                    </Box>,
                    {
                        variant: type,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                        preventDuplicate: true,
                        key,
                        disableWindowBlurListener: true,
                    }
                );
            }
        },
        close: (key) => {
            closeSnackbar(key);
        },
    };

    return notificationProvider;
};
