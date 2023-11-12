import React from 'react';
import { LoginFormTypes, useLogin, useTranslate } from '@refinedev/core';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LAST_LOGIN, LAST_PASSWORD, LAST_REMEMBER } from 'src/utils/constant';
import { boolean, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormGroup } from '@mui/material';
import { LoadingButton } from '@mui/lab';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export const LoginPage = ({}) => {
    const initialValues = {
        email: localStorage.getItem(LAST_LOGIN) || '',
        password: localStorage.getItem(LAST_PASSWORD) || '',
        remember: !!localStorage.getItem(LAST_REMEMBER),
    };

    const { mutate: login, isLoading } = useLogin<LoginFormTypes>({});

    const t = useTranslate();

    const registerSchema = object({
        email: string().email(t('login.emailIsInvalid')),
        password: string().min(1, t('login.passwordNotPresent')),
        remember: boolean(),
    });

    type RegisterInput = TypeOf<typeof registerSchema>;

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        login(values);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        defaultValue={initialValues.email}
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        error={!!errors['email']}
                        helperText={errors['email']?.message || ''}
                        {...register('email')}
                    />
                    <TextField
                        defaultValue={initialValues.password}
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={!!errors['password']}
                        helperText={errors['password']?.message || ''}
                        {...register('password')}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked={initialValues.remember} color="primary" />}
                            label="Remember me"
                            {...register('remember')}
                        />
                        <Typography>{errors['remember']?.message}</Typography>
                    </FormGroup>
                    <LoadingButton
                        loading={isLoading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </LoadingButton>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};
