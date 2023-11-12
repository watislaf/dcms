// ==============================|| OVERRIDES - CHECKBOX ||============================== //

import { Theme } from '@mui/material/styles/createTheme';

export default function Checkbox(theme: Theme) {
    return {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    // @ts-ignore
                    color: theme.palette.secondary[300],
                },
            },
        },
    };
}
