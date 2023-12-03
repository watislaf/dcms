import { forwardRef, ReactNode } from 'react';

import { Box, Fade, Grow } from '@mui/material';

type Prop = {
    type: 'grow' | 'fade';
    children: ReactNode;
};

export type Ref = HTMLElement;

const Transitions = forwardRef<Ref, Prop>(({ children, type = 'grow', ...others }, ref) => {
    const positionSX = {
        transformOrigin: '0 0 0',
    };

    return (
        <Box ref={ref}>
            {type === 'grow' && (
                <Grow {...others}>
                    <Box sx={positionSX}>{children}</Box>
                </Grow>
            )}
            {type === 'fade' && (
                <Fade
                    {...others}
                    timeout={{
                        appear: 0,
                        enter: 300,
                        exit: 150,
                    }}
                >
                    <Box sx={positionSX}>{children}</Box>
                </Fade>
            )}
        </Box>
    );
});

export default Transitions;
