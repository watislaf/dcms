import './errorOverlay';
import './i18n';

import { Refine } from '@refinedev/core';
import { RefineSnackbarProvider } from '@refinedev/mui';
import routerBindings from '@refinedev/react-router-v6';
import { BrowserRouter } from 'react-router-dom';
import { authProvider } from 'src/providers/authProvider';
import Routers from 'src/router/Routers';
import { dataProvider, getApiResources } from 'src/providers/dataProvider';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
import { useI18nProvider } from 'src/providers/i18nProvider';
import { notificationProvider } from 'src/providers/notificationProvider';

const defaultTheme = createTheme({});

function App() {
    const i18nProvider = useI18nProvider();

    return (
        <BrowserRouter>
            <ThemeProvider theme={defaultTheme}>
                <RefineSnackbarProvider>
                    <Refine
                        i18nProvider={i18nProvider}
                        dataProvider={dataProvider()}
                        notificationProvider={notificationProvider}
                        routerProvider={routerBindings}
                        authProvider={authProvider}
                        resources={getApiResources()}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            projectId: '3krswJ-i8NVyz-nRLy98',
                        }}
                    >
                        <Routers />
                    </Refine>
                </RefineSnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
