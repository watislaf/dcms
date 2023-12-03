// material-ui
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

// project import
import { drawerWidth } from 'src/utils/constant';
import { ProjectTheme } from 'src/themes';

const openedMixin = (theme: ProjectTheme) => ({
    width: drawerWidth,
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    boxShadow: 'none',
});

const closedMixin = (theme: ProjectTheme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
    borderRight: 'none',
    boxShadow: theme.customShadows.z1,
});
    
type Props = {
    theme: ProjectTheme;
    open: boolean;
};

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    // @ts-ignore
    ({ theme, open }: Props) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    })
);

export default MiniDrawerStyled;
