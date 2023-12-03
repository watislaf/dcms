import { useMemo } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import DrawerHeader from './DrawerHeader/index';
import DrawerContent from './DrawerContent/index';
import MiniDrawerStyled from './MiniDrawerStyled';
import { drawerWidth } from 'src/utils/constant';

type Props = {
    open: boolean;
    handleDrawerToggle: () => void;
};

const MainDrawer = ({ open, handleDrawerToggle }: Props) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    // header content
    const drawerContent = useMemo(() => <DrawerContent />, []);
    const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
            {!matchDownMD ? (
                <MiniDrawerStyled variant="permanent" open={open}>
                    {drawerHeader}
                    {drawerContent}
                </MiniDrawerStyled>
            ) : (
                <Drawer
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderRight: `1px solid ${theme.palette.divider}`,
                            backgroundImage: 'none',
                            boxShadow: 'inherit',
                        },
                    }}
                >
                    {open && drawerHeader}
                    {open && drawerContent}
                </Drawer>
            )}
        </Box>
    );
};

export default MainDrawer;
