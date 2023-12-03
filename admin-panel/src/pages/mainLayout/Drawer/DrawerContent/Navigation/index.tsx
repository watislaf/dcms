// material-ui
import { Box, Typography } from '@mui/material';

import NavGroup from './NavGroup';
import menuItems from 'src/pages/pages-list';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OPENED_ITEM } from 'src/utils/constant';

type OpenItemOperation = {
    openedItem: string;
    setOpenItem: Dispatch<SetStateAction<string>>;
};

export const OpenItemOperationsContext = createContext<OpenItemOperation>({
    setOpenItem(value: ((prevState: string) => string) | string): void {},
    openedItem: localStorage.getItem(OPENED_ITEM) || '',
});

const Navigation = () => {
    const savedOpenItem = localStorage.getItem(OPENED_ITEM);

    const [openedItem, setOpenItem] = useState<string>(savedOpenItem || '');

    useEffect(() => {
        localStorage.setItem(OPENED_ITEM, openedItem);
    }, [openedItem]);

    const navGroups = menuItems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return (
                    <OpenItemOperationsContext.Provider key={item.id} value={{ openedItem, setOpenItem }}>
                        <NavGroup item={item} />
                    </OpenItemOperationsContext.Provider>
                );
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Fix - Navigation Group
                    </Typography>
                );
        }
    });

    return <Box sx={{ pt: 1 }}>{navGroups}</Box>;
};

export default Navigation;
