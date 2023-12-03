import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Box, Toolbar } from '@mui/material';

import Drawer from './Drawer/index';
import Header from './Header/index';
import { DRAWER_IS_OPENED } from 'src/utils/constant';

export const DrawerIsOpenedContext = createContext(true);

const MainLayout = () => {
    const theme = useTheme();

    const drawerOpen = !!localStorage.getItem(DRAWER_IS_OPENED);

    // drawer toggler
    const [open, setOpen] = useState(drawerOpen);

    const handleDrawerToggle = () => {
        setOpen(!open);

        if (open) {
            localStorage.setItem(DRAWER_IS_OPENED, 'yes');
        } else {
            localStorage.removeItem(DRAWER_IS_OPENED);
        }
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <DrawerIsOpenedContext.Provider value={open}>
                <Header open={open} handleDrawerToggle={handleDrawerToggle} />
                <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
                <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                    <Toolbar />
                    <Outlet />
                </Box>
            </DrawerIsOpenedContext.Provider>
        </Box>
    );
};

export default MainLayout;
