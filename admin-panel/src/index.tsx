import React from 'react';
import { createRoot } from 'react-dom/client';
import Loadable from 'src/components/Loadable';
import Box from '@mui/material/Box';

const App = Loadable(React.lazy(() => import('./App')));

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Box height={'100vh'}>
            <App />
        </Box>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
