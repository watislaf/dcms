import React from 'react';
import { createRoot } from 'react-dom/client';

import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const App = React.lazy(() => import('./App'));

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

export default function LinearIndeterminate() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
        </Box>
    );
}

root.render(
    <React.StrictMode>
        <React.Suspense fallback={<LinearIndeterminate />}>
            <App />
        </React.Suspense>
    </React.StrictMode>
);
