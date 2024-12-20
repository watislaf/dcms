import React, { MouseEvent } from 'react';

// material-ui
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';

import FirebaseSocial from 'src/pages/login/auth-forms/FirebaseSocial';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import AnimateButton from 'src/components/@extended/AnimateButton';
import { LAST_LOGIN, LAST_PASSWORD, LAST_REMEMBER } from 'src/utils/constant';
import { LoginFormTypes, useLogin, useTranslate } from '@refinedev/core';

const AuthLogin = () => {
    const initialValues = {
        email: localStorage.getItem(LAST_LOGIN) || '',
        password: localStorage.getItem(LAST_PASSWORD) || '',
        remember: !!localStorage.getItem(LAST_REMEMBER),
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: MouseEvent) => {
        event.preventDefault();
    };

    const { mutate: login, isLoading, ...rher } = useLogin<LoginFormTypes>({});

    const t = useTranslate();

    return (
        <>
            <Formik
                initialValues={{
                    ...initialValues,
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    remember: Yup.boolean(),
                })}
                onSubmit={async (values) => {
                    login(values);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                    <OutlinedInput
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? (
                                                        <EyeOutlined />
                                                    ) : (
                                                        <EyeInvisibleOutlined />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.remember}
                                                onChange={handleChange}
                                                name="remember"
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label={<Typography variant="h6">Remember me</Typography>}
                                    />
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color={isLoading ? 'secondary' : 'primary'}
                                    >
                                        Login
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            {false && (
                                <>
                                    <Grid item xs={12}>
                                        <Divider>
                                            <Typography variant="caption"> Login with</Typography>
                                        </Divider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FirebaseSocial />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
