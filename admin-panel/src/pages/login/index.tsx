import React from 'react';
import {
    LoginFormTypes,
    LoginPageProps,
    useActiveAuthProvider,
    useLogin,
    useTranslate,
} from '@refinedev/core';
import {
    Box,
    BoxProps,
    Button,
    Card,
    CardProps,
    Checkbox,
    PasswordInput,
    Space,
    TextInput,
    Title,
    useMantineTheme,
} from '@mantine/core';

import { cardStyles, layoutStyles, titleStyles } from './styles';
import { LAST_LOGIN, LAST_PASSWORD, LAST_REMEMBER } from 'src/utils/constant';
import { FormContext, FormPropsType } from '@refinedev/mantine';

type LoginProps = LoginPageProps<BoxProps, CardProps, FormPropsType>;

export const LoginPage: React.FC<LoginProps> = ({}) => {
    const initialValues = {
        email: localStorage.getItem(LAST_LOGIN) || '',
        password: localStorage.getItem(LAST_PASSWORD) || '',
        remember: !!localStorage.getItem(LAST_REMEMBER),
    };

    const theme = useMantineTheme();
    const { useForm, FormProvider } = FormContext;
    const t = useTranslate();

    const form = useForm({
        initialValues,
        validate: {
            email: (value: string) =>
                /^\S+@\S+$/.test(value) ? null : t('pages.login.errors.validEmail', 'Invalid email address'),
            password: (value: string) => value === '',
        },
    });

    const { onSubmit, getInputProps } = form;

    const authProvider = useActiveAuthProvider();

    const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const CardContent = (
        <Card style={cardStyles}>
            <Title style={titleStyles} color={theme.colorScheme === 'dark' ? 'brand.5' : 'brand.8'}>
                {t('pages.login.title', 'Sign in to your account')}
            </Title>
            <Space h="sm" />
            <Space h="lg" />
            <FormProvider form={form}>
                <form
                    onSubmit={onSubmit((values: any) => {
                        return login(values);
                    })}
                >
                    <TextInput
                        autoComplete="off"
                        name="email"
                        label={t('pages.login.fields.email', 'Email')}
                        placeholder={t('pages.login.fields.email', 'Email')}
                        {...getInputProps('email')}
                    />
                    <PasswordInput
                        name="password"
                        mt="md"
                        label={t('pages.login.fields.password', 'Password')}
                        placeholder="********"
                        {...getInputProps('password')}
                    />
                    <Box
                        mt="md"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Checkbox
                            label={t('pages.login.buttons.rememberMe', 'Remember me')}
                            size="xs"
                            {...getInputProps('remember', {
                                type: 'checkbox',
                            })}
                        />
                    </Box>
                    <Button mt="md" fullWidth size="md" type="submit" loading={isLoading}>
                        {t('pages.login.signin', 'Sign in')}
                    </Button>
                </form>
            </FormProvider>
        </Card>
    );

    return <Box style={layoutStyles}>{CardContent}</Box>;
};
