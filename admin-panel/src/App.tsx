import { ColorScheme, ColorSchemeProvider, Global, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import { notificationProvider, RefineThemes } from '@refinedev/mantine';
import routerBindings, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { BrowserRouter } from 'react-router-dom';

import { authProvider } from 'src/authProvider';
import Routers from 'src/router/Routers';

function App() {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                    <MantineProvider
                        theme={{ ...RefineThemes.Blue, colorScheme: colorScheme }}
                        withNormalizeCSS
                        withGlobalStyles
                    >
                        <Global styles={{ body: { WebkitFontSmoothing: 'auto' } }} />
                        <NotificationsProvider position="top-right">
                            <Refine
                                dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
                                notificationProvider={notificationProvider}
                                routerProvider={routerBindings}
                                authProvider={authProvider}
                                resources={[
                                    {
                                        name: 'blog_posts',
                                        list: '/blog-posts',
                                        create: '/blog-posts/create',
                                        edit: '/blog-posts/edit/:id',
                                        show: '/blog-posts/show/:id',
                                        meta: {
                                            canDelete: true,
                                        },
                                    },
                                    {
                                        name: 'categories',
                                        list: '/categories',
                                        create: '/categories/create',
                                        edit: '/categories/edit/:id',
                                        show: '/categories/show/:id',
                                        meta: {
                                            canDelete: true,
                                        },
                                    },
                                ]}
                                options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                    projectId: '3krswJ-i8NVyz-nRLy98',
                                }}
                            >
                                <Routers />
                                <RefineKbar />
                                <UnsavedChangesNotifier />
                                <DocumentTitleHandler />
                            </Refine>
                        </NotificationsProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
