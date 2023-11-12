import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const Loader = () => (
    <Box display="flex" justifyContent="center" alignItems="center" height={'100%'}>
        <CircularProgress />
    </Box>
);

export default Loader;
