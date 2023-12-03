import React from 'react';
import { LoginFormTypes, useGo, useLogin } from '@refinedev/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from '@mui/material';
import MainCard from 'src/components/mainCard';
import { useTheme } from '@mui/material/styles';
import { ProjectTheme } from 'src/themes';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const UserCreate = () => {
    const initialValues = {
        email: '',
    };

    const theme = useTheme<ProjectTheme>();

    const go = useGo();

    const { mutate: login, isLoading } = useLogin<LoginFormTypes>({});

    return (
        <Grid direction={'column'} container>
            <Grid container sx={{ mt: 2, mb: 3 }}>
                <IconButton
                    disableRipple
                    onClick={() => {
                        go({ type: 'replace', to: '/users' });
                    }}
                    size={'small'}
                    sx={{
                        color: theme.palette.info.contrastText,
                        bgcolor: theme.palette.warning.main,
                        mr: { xs: 1 },
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>

                <Typography alignSelf={'center'} variant="h5">
                    Create users
                </Typography>
            </Grid>

            <Grid item>
                <MainCard boxShadow sx={{ width: 1000 }}>
                    <Formik
                        initialValues={{
                            ...initialValues,
                            submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email('Must be a valid email')
                                .max(255)
                                .required('Email is required'),
                        })}
                        onSubmit={async (values) => {
                            login(values);
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                    <OutlinedInput
                                        value={values.email}
                                        onBlur={handleBlur}
                                        name="email"
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}

                                    {errors.submit && <FormHelperText error>{errors.submit}</FormHelperText>}
                                    <Button
                                        disableElevation
                                        type="submit"
                                        variant="contained"
                                        color={isLoading ? 'secondary' : 'primary'}
                                    >
                                        Create
                                    </Button>
                                </Stack>
                            </form>
                        )}
                    </Formik>
                </MainCard>
            </Grid>
        </Grid>
    );
};
