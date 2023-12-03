import { forwardRef, ReactNode } from 'react';

import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Theme, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { ProjectTheme } from 'src/themes';

const headerSX = {
    p: 2.5,
    '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
};

type Props = {
    border?: boolean;
    boxShadow?: boolean;
    contentSX?: object;
    darkTitle?: boolean;
    divider?: boolean;
    elevation?: number;
    secondary?: ReactNode;
    shadow?: string;
    sx: SxProps<Theme>;
    title?: string | ReactNode;
    codeHighlight?: boolean;
    content?: boolean;
    children: ReactNode;
};

export type Ref = HTMLDivElement;

const MainCard = forwardRef<Ref, Props>(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentSX = {},
            darkTitle,
            elevation,
            secondary,
            shadow,
            sx = {},
            title,
            ...others
        },
        ref
    ) => {
        const theme = useTheme<ProjectTheme>();
        boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

        return (
            <Card
                elevation={elevation || 0}
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderRadius: 2,
                    borderColor:
                        theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
                    boxShadow:
                        boxShadow && (!border || theme.palette.mode === 'dark')
                            ? shadow || theme.customShadows.z1
                            : 'inherit',
                    ':hover': {
                        boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit',
                    },
                    '& pre': {
                        m: 0,
                        p: '16px !important',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '0.75rem',
                    },
                    ...sx,
                }}
            >
                {/* card header and action */}
                {!darkTitle && title && (
                    <CardHeader
                        sx={headerSX}
                        titleTypographyProps={{ variant: 'subtitle1' }}
                        title={title}
                        action={secondary}
                    />
                )}
                {darkTitle && title && (
                    <CardHeader
                        sx={headerSX}
                        title={<Typography variant="h3">{title}</Typography>}
                        action={secondary}
                    />
                )}

                {/* card content */}
                {content && <CardContent sx={contentSX}>{children}</CardContent>}
                {!content && children}
            </Card>
        );
    }
);

export default MainCard;
