import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { ProjectTheme } from 'src/themes';

type Props = {
    theme: ProjectTheme;
    open: boolean;
};

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }: Props) => ({
        ...theme.mixins.toolbar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: open ? 'flex-start' : 'center',
        paddingLeft: theme.spacing(open ? 3 : 0),
    })
);

export default DrawerHeaderStyled;
