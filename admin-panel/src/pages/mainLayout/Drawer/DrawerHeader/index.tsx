import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/material';
import Logo from 'src/components/Logo/Logo';
import { ProjectTheme } from 'src/themes';
import Typography from '@mui/material/Typography';

type Props = {
    open: boolean;
};

const DrawerHeader = ({ open }: Props) => {
    const theme = useTheme<ProjectTheme>();

    return (
        <Stack
            display="flex"
            width={200}
            paddingLeft={theme.spacing(1)}
            direction="row"
            spacing={0}
            alignItems="left"
        >
            <Logo />
            {open && (
                <Typography variant="h4" alignSelf={'center'}>
                    Expander
                </Typography>
            )}
        </Stack>
    );
};

export default DrawerHeader;
