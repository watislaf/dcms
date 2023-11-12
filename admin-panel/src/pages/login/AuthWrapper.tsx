import { Box, Grid } from '@mui/material';
import AuthCard from 'src/pages/login/AuthCard';
import AuthFooter from 'src/components/cards/AuthFooter';
import AuthBackground from 'src/assets/images/auth/AuthBackground';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const AuthWrapper = ({ children }: Props) => (
    <Box sx={{ minHeight: '100vh' }} overflow={'hidden'}>
        <AuthBackground />
        <Grid
            container
            direction="column"
            justifyContent="flex-end"
            sx={{
                minHeight: '100vh',
            }}
        >
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                >
                    <Grid item>
                        <AuthCard>{children}</AuthCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                <AuthFooter />
            </Grid>
        </Grid>
    </Box>
);

export default AuthWrapper;
