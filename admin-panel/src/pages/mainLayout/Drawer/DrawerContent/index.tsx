// project import
import NavCard from './NavCard.js';
import Navigation from './Navigation/index.js';
import SimpleBar from 'src/components/third-party/SimpleBar.js';

// ==============================|| DRAWER CONTENT ||============================== //

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
        <NavCard />
    </SimpleBar>
);

export default DrawerContent;
