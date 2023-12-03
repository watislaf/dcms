// project import
import Navigation from './Navigation/index';
import SimpleBar from 'src/components/third-party/SimpleBar';
import { Chip } from '@mui/material';

const DrawerContent = () => (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column',
            },
        }}
    >
        <Navigation />
        <Chip
            label={'v1.0.0'}
            size="small"
            sx={{
                height: 16,
                alignSelf: 'center',
                '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 },
            }}
            component="a"
            href="https://expander.pl/"
            target="_blank"
            clickable
        />
    </SimpleBar>
);

export default DrawerContent;
